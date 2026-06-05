import {CameraFrame, DetectedFace} from '../../types/face';

export type FaceDetectorSession = {
  detect(frame: CameraFrame): Promise<DetectedFace[]>;
};

export class FaceDetectionService {
  constructor(private readonly detector: FaceDetectorSession) {}

  async detectPrimaryFace(frame: CameraFrame): Promise<DetectedFace> {
    const faces = await this.detector.detect(frame);
    if (faces.length === 0) {
      throw new Error('No face detected');
    }
    return faces.sort((left, right) => area(right) - area(left))[0];
  }
}

function area(face: DetectedFace): number {
  return face.bounds.width * face.bounds.height;
}
