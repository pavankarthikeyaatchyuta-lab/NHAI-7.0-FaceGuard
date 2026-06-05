import {CameraFrame, FaceEmbedding} from '../../types/face';
import {averageVectors} from './VectorMath';

export type InferenceSession = {
  run(input: Float32Array): Promise<number[]>;
};

export class FaceEmbeddingService {
  constructor(
    private readonly session: InferenceSession,
    private readonly modelId = 'mobilefacenet-onnx-target-20mb',
  ) {}

  async embedFrame(frame: CameraFrame): Promise<FaceEmbedding> {
    const tensor = this.preprocess(frame);
    const rawVector = await this.session.run(tensor);
    return {
      modelId: this.modelId,
      vector: averageVectors([rawVector]),
      createdAt: new Date().toISOString(),
    };
  }

  async embedFrames(frames: CameraFrame[]): Promise<FaceEmbedding> {
    const embeddings = await Promise.all(frames.map(frame => this.embedFrame(frame)));
    return {
      modelId: this.modelId,
      vector: averageVectors(embeddings.map(embedding => embedding.vector)),
      createdAt: new Date().toISOString(),
    };
  }

  private preprocess(frame: CameraFrame): Float32Array {
    const channels = 3;
    const expectedSize = frame.width * frame.height * channels;
    const input = new Float32Array(expectedSize);
    const source = frame.data.length >= expectedSize ? frame.data : new Uint8Array(expectedSize);
    for (let index = 0; index < expectedSize; index += 1) {
      input[index] = source[index] / 127.5 - 1;
    }
    return input;
  }
}
