# Models

FaceGuard is designed for lightweight open-source models that can run through ONNX Runtime Mobile on Android and iOS.

Recommended starting point:

- Face embedding: MobileFaceNet or a compact InsightFace variant exported to ONNX.
- Face detection and landmarks: SCRFD 500M/2.5G or a BlazeFace-style detector.
- Liveness features: landmark probabilities, head pose, frame texture, moire/replay-risk heuristics.

Model binaries are intentionally not committed because hackathon reviewers and teams should verify licenses and reproduce conversion steps. Place exported files here:

- `mobilefacenet.onnx`
- `scrfd-lite.onnx`

Target metrics, not measured claims:

- Model size: around 20 MB total after quantization.
- Recognition plus liveness: under 1 second on 3 GB RAM devices.
- Accuracy: above 95 percent after validation on an appropriate field dataset.
