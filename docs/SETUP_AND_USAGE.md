# Setup And Usage

This guide is intended for reviewers and engineers evaluating FaceGuard.

## Root Validation

```bash
cd FaceGuard
npm install
npm run validate
npm test
```

## Mobile Development

Android:

```bash
cd FaceGuard/mobile
npm install
npm run android
```

iOS:

```bash
cd FaceGuard/mobile
npm install
cd ios && pod install && cd ..
npm run ios
```

## Backend Deployment

```bash
cd FaceGuard/backend/infra
sam build
sam deploy --guided
```

## Demo Flow

1. Open FaceGuard.
2. Enroll personnel with a local personnel ID.
3. Run liveness challenge sequence.
4. Verify face against the encrypted local record.
5. Confirm authentication success.
6. Open Sync Status.
7. Run sync check after connectivity returns.

## Offline Demo Notes

- Authentication should not depend on cloud connectivity.
- Raw frames should not be saved.
- Sync should upload audit events only.
- Local queue records should be purged only after backend acknowledgement.

## Production Readiness Notes

Before field release:

- Add verified ONNX model files.
- Add native model bundle signing.
- Measure latency and memory on target devices.
- Validate liveness thresholds with spoof attempts.
- Run Android and iOS camera permission tests.
