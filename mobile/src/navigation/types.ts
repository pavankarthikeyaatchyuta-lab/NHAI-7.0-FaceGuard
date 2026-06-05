export type RootStackParamList = {
  Splash: undefined;
  Enrollment: undefined;
  Liveness: {personnelId: string};
  FaceVerification: {personnelId: string};
  Success: {personnelId: string; score: number};
  SyncStatus: undefined;
  Settings: undefined;
};
