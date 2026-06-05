import {CameraFrame, IdentityRecord} from '../../types/face';
import {FaceAlignmentService} from './FaceAlignmentService';
import {FaceDetectionService} from './FaceDetectionService';
import {FaceEmbeddingService, InferenceSession} from './FaceEmbeddingService';
import {SimilarityService, VerificationResult} from './SimilarityService';

class DeterministicDemoSession implements InferenceSession {
  async run(input: Float32Array): Promise<number[]> {
    const buckets = new Array<number>(128).fill(0);
    for (let index = 0; index < input.length; index += 1) {
      buckets[index % buckets.length] += input[index];
    }
    return buckets.map((value, index) => Math.sin(value + index * 0.07));
  }
}

export class FacePipeline {
  constructor(
    private readonly embeddingService: FaceEmbeddingService,
    private readonly similarityService: SimilarityService,
    private readonly detectionService?: FaceDetectionService,
    private readonly alignmentService = new FaceAlignmentService(),
  ) {}

  static createDemoPipeline(): FacePipeline {
    return new FacePipeline(new FaceEmbeddingService(new DeterministicDemoSession()), new SimilarityService());
  }

  async enroll(personnelId: string, deviceId: string, frames: CameraFrame[]): Promise<IdentityRecord> {
    if (!personnelId) {
      throw new Error('personnelId is required');
    }
    return {
      personnelId,
      deviceId,
      embedding: await this.embeddingService.embedFrames(await this.prepareFrames(frames)),
      enrolledAt: new Date().toISOString(),
    };
  }

  async verify(probeFrames: CameraFrame[], reference: IdentityRecord): Promise<VerificationResult> {
    const probe = await this.embeddingService.embedFrames(await this.prepareFrames(probeFrames));
    return this.similarityService.compare(probe, reference.embedding);
  }

  async enrollFromDemoFrame(personnelId: string, deviceId: string): Promise<IdentityRecord> {
    return this.enroll(personnelId, deviceId, [demoFrame()]);
  }

  async verifyDemoFrame(personnelId: string): Promise<VerificationResult> {
    const reference = await this.enrollFromDemoFrame(personnelId, 'field-device');
    return this.verify([demoFrame()], reference);
  }

  private async prepareFrames(frames: CameraFrame[]): Promise<CameraFrame[]> {
    if (!this.detectionService) {
      return frames;
    }
    return Promise.all(frames.map(async frame => {
      const face = await this.detectionService.detectPrimaryFace(frame);
      return this.alignmentService.align(frame, face);
    }));
  }
}

function demoFrame(): CameraFrame {
  const width = 16;
  const height = 16;
  const data = new Uint8Array(width * height * 3);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = (index * 17) % 255;
  }
  return {width, height, timestampMs: Date.now(), data};
}
