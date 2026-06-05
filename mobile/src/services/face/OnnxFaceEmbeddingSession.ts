import * as ort from 'onnxruntime-react-native';
import {InferenceSession} from './FaceEmbeddingService';

export class OnnxFaceEmbeddingSession implements InferenceSession {
  private constructor(
    private readonly session: ort.InferenceSession,
    private readonly inputName: string,
    private readonly outputName: string,
  ) {}

  static async load(modelUri: string, inputName = 'input', outputName = 'embeddings'): Promise<OnnxFaceEmbeddingSession> {
    const session = await ort.InferenceSession.create(modelUri, {
      executionProviders: ['cpu'],
      graphOptimizationLevel: 'all',
    });
    return new OnnxFaceEmbeddingSession(session, inputName, outputName);
  }

  async run(input: Float32Array): Promise<number[]> {
    const tensor = new ort.Tensor('float32', input, [1, 3, 112, 112]);
    const outputs = await this.session.run({[this.inputName]: tensor});
    const output = outputs[this.outputName];
    if (!output) {
      throw new Error(`Missing ONNX output tensor ${this.outputName}`);
    }
    return Array.from(output.data as Float32Array);
  }
}
