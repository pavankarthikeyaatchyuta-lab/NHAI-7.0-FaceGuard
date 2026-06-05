# Presentation Outline

## Slide 1: FaceGuard

Offline facial recognition and liveness authentication for NHAI field personnel.

## Slide 2: Field Problem

- Remote locations have unreliable connectivity.
- Centralized authentication can fail when network is unavailable.
- Biometric data must be protected on device.

## Slide 3: Solution

- On-device face recognition.
- On-device liveness detection.
- Encrypted local storage.
- Delayed AWS sync and local purge.

## Slide 4: Architecture

Show the offline authentication and sync-purge diagrams from `docs/ARCHITECTURE.md`.

## Slide 5: Security

- Challenge-response liveness.
- AES encrypted embeddings.
- Raw frames not persisted.
- Payload hash verification.

## Slide 6: Feasibility

- React Native integration.
- ONNX Runtime Mobile path.
- Optional TFLite frame-processor production path.
- Modular native bridge services.
- Datalake 3.0 ingestion plan.

## Slide 7: Testing Plan

Use `docs/TESTING_PLAN.md` to show field validation scenarios without unsupported benchmark claims.

## Slide 8: Roadmap

- Add verified model binaries.
- Measure on target devices.
- Add signed sync payloads.
- Integrate with Datalake 3.0 ingestion.

## Slide 9: Credibility

- Metrics are documented as targets until measured.
- Benchmark protocol defines evidence needed for claims.
- No raw face frames are synced to cloud.
