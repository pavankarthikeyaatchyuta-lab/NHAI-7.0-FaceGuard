export type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type FaceLandmarks = {
  leftEye: [number, number];
  rightEye: [number, number];
  nose: [number, number];
  mouthLeft: [number, number];
  mouthRight: [number, number];
};

export type CameraFrame = {
  width: number;
  height: number;
  timestampMs: number;
  data: Uint8Array;
};

export type DetectedFace = {
  bounds: BoundingBox;
  landmarks: FaceLandmarks;
  yaw: number;
  pitch: number;
  roll: number;
  leftEyeOpenProbability?: number;
  rightEyeOpenProbability?: number;
  smilingProbability?: number;
};

export type FaceEmbedding = {
  modelId: string;
  vector: number[];
  createdAt: string;
};

export type IdentityRecord = {
  personnelId: string;
  embedding: FaceEmbedding;
  enrolledAt: string;
  deviceId: string;
};
