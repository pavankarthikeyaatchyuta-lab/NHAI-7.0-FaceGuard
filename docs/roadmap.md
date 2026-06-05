# Implementation Roadmap

## Hackathon Demo

- Use deterministic demo inference to walk through enrollment, liveness, verification, sync, and purge.
- Deploy backend with SAM and show accepted sync IDs.
- Present target metrics clearly as targets.

## Engineering Completion

- Add verified ONNX model binaries and model cards.
- Wire Vision Camera frames to native frame processors.
- Add face detection and alignment model execution.
- Replace demo inference with `onnxruntime-react-native` sessions.
- Add secure device registration and signed event upload.

## Field Readiness

- Validate with consented representative data.
- Measure latency and memory on 3 GB Android devices.
- Conduct spoof testing with print, screen replay, and mask scenarios.
- Add field operator audit dashboard.
