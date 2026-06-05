import {CameraFrame} from '../../types/face';

export type CameraAdapter = {
  requestPermission(): Promise<boolean>;
  captureFrame(): Promise<CameraFrame>;
};

export class CameraFrameService {
  constructor(private readonly camera: CameraAdapter) {}

  async captureBurst(count = 5): Promise<CameraFrame[]> {
    const granted = await this.camera.requestPermission();
    if (!granted) {
      throw new Error('Camera permission denied');
    }
    const frames: CameraFrame[] = [];
    for (let index = 0; index < count; index += 1) {
      frames.push(await this.camera.captureFrame());
    }
    return frames;
  }
}
