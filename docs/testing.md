# Testing

The repository includes focused unit tests for the offline logic that can run without a physical device:

- `mobile/__tests__/similarity.test.ts`
- `mobile/__tests__/liveness.test.ts`
- `mobile/__tests__/sync.test.ts`

Run:

```bash
cd FaceGuard
npm install
npm test
```

Device-level tests still required before deployment:

- Android camera permission and capture path.
- iOS camera permission and capture path.
- ONNX model loading on low-RAM devices.
- End-to-end latency measurement on target hardware.
- Dataset validation for recognition and liveness thresholds.
