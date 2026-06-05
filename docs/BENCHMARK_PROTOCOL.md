# Benchmark Protocol

This document exists so FaceGuard can publish measured numbers later without weakening credibility.

The repository should not claim model size, APK size, latency, match confidence, frame rate, or physical-device verification unless the following evidence is recorded.

## Device Matrix

| Device Class | Required Evidence |
|---|---|
| 3 GB RAM Android | Device model, chipset, Android version |
| Mid-range Android | Device model, chipset, Android version |
| iPhone | Device model, iOS version |
| Low-light field device | Lighting description and sample count |

## Metrics

| Metric | How To Measure |
|---|---|
| Model size | Sum final shipped `.onnx` or `.tflite` assets |
| APK size | Release artifact size per ABI |
| Latency | Median and p95 from camera frame to decision |
| Frame rate | Overlay or processor FPS during verification |
| False accept rate | Non-matching enrolled-vs-probe pairs |
| False reject rate | Matching enrolled-vs-probe pairs |
| Liveness bypass rate | Photo, screen replay, and held-video tests |
| Memory use | Peak app memory during camera and inference |

## Reporting Template

```text
Device:
Chipset:
OS:
Build:
Model files:
Acceleration:
Runs:
Median latency:
p95 latency:
Model size:
APK size:
Dataset size:
Protocol:
```

## README Rule

Only move a metric from "target" to "verified" when the measurement is reproducible and the evidence is committed or linked.
