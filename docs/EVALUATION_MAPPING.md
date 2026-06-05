# NHAI Evaluation Mapping

This document maps FaceGuard features directly to likely NHAI Hackathon evaluation criteria.

| Criteria | Feature |
|---|---|
| Innovation | Multi-layer liveness detection |
| Innovation | Lightweight mobile face embedding pipeline |
| Innovation | Fully offline biometric authentication |
| Innovation | Sync-and-purge audit design |
| Feasibility | React Native Android and iOS integration |
| Feasibility | iOS build guide and native module checklist |
| Feasibility | Open-source model and runtime strategy |
| Feasibility | ONNX path plus optional TFLite production path |
| Feasibility | Encrypted local storage architecture |
| Feasibility | Modular services that can be replaced by native bridges |
| Scalability | Offline queue for low-connectivity field deployment |
| Scalability | AWS serverless sync backend |
| Scalability | Datalake 3.0 event ingestion path |
| Scalability | Lighting and field-condition testing plan |
| Security | AES-256-GCM encrypted local records |
| Security | Threat model for spoofing, replay, theft, and tampering |
| Presentation | Professional README and architecture diagrams |
| Presentation | UI mockups for key workflows |
| Presentation | Integration, testing, and sync-purge documentation |
| Presentation | Technical documentation and benchmark protocol |

## Judge Narrative

FaceGuard is positioned as a practical field authentication system, not only a model demo. The repository shows:

- How field personnel enroll and authenticate offline.
- How liveness challenges reduce spoofing risk.
- How sensitive biometric records stay on device.
- How NHAI can sync audit events after connectivity returns.
- How the project can be validated without making unsupported claims.
