import {CameraFrame, DetectedFace} from '../../types/face';

export class FaceAlignmentService {
  align(frame: CameraFrame, face: DetectedFace): CameraFrame {
    const leftEye = face.landmarks.leftEye;
    const rightEye = face.landmarks.rightEye;
    const eyeDeltaX = rightEye[0] - leftEye[0];
    const eyeDeltaY = rightEye[1] - leftEye[1];
    const rollRadians = Math.atan2(eyeDeltaY, eyeDeltaX);
    const crop = this.cropFaceRegion(frame, face, rollRadians);
    return this.resizeNearest(crop, 112, 112);
  }

  private cropFaceRegion(frame: CameraFrame, face: DetectedFace, rollRadians: number): CameraFrame {
    const padding = Math.round(Math.max(face.bounds.width, face.bounds.height) * 0.18);
    const startX = Math.max(0, Math.round(face.bounds.x - padding));
    const startY = Math.max(0, Math.round(face.bounds.y - padding));
    const endX = Math.min(frame.width, Math.round(face.bounds.x + face.bounds.width + padding));
    const endY = Math.min(frame.height, Math.round(face.bounds.y + face.bounds.height + padding));
    const width = endX - startX;
    const height = endY - startY;
    const data = new Uint8Array(width * height * 3);
    const cos = Math.cos(-rollRadians);
    const sin = Math.sin(-rollRadians);
    const centerX = startX + width / 2;
    const centerY = startY + height / 2;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const sourceX = Math.round(centerX + (x - width / 2) * cos - (y - height / 2) * sin);
        const sourceY = Math.round(centerY + (x - width / 2) * sin + (y - height / 2) * cos);
        if (sourceX < 0 || sourceX >= frame.width || sourceY < 0 || sourceY >= frame.height) {
          continue;
        }
        const sourceIndex = (sourceY * frame.width + sourceX) * 3;
        const targetIndex = (y * width + x) * 3;
        data[targetIndex] = frame.data[sourceIndex];
        data[targetIndex + 1] = frame.data[sourceIndex + 1];
        data[targetIndex + 2] = frame.data[sourceIndex + 2];
      }
    }

    return {width, height, data, timestampMs: frame.timestampMs};
  }

  private resizeNearest(frame: CameraFrame, targetWidth: number, targetHeight: number): CameraFrame {
    const data = new Uint8Array(targetWidth * targetHeight * 3);
    for (let y = 0; y < targetHeight; y += 1) {
      for (let x = 0; x < targetWidth; x += 1) {
        const sourceX = Math.min(frame.width - 1, Math.floor((x / targetWidth) * frame.width));
        const sourceY = Math.min(frame.height - 1, Math.floor((y / targetHeight) * frame.height));
        const sourceIndex = (sourceY * frame.width + sourceX) * 3;
        const targetIndex = (y * targetWidth + x) * 3;
        data[targetIndex] = frame.data[sourceIndex];
        data[targetIndex + 1] = frame.data[sourceIndex + 1];
        data[targetIndex + 2] = frame.data[sourceIndex + 2];
      }
    }
    return {width: targetWidth, height: targetHeight, data, timestampMs: frame.timestampMs};
  }
}
