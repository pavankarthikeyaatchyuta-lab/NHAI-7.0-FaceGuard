# Brief Compliance

This table maps FaceGuard against the hackathon brief. Target metrics are not benchmark claims.

| Requirement | FaceGuard Status |
|---|---|
| Work completely offline | Offline enrollment, liveness, embedding, comparison, and queueing architecture included |
| Integrate with React Native | React Native TypeScript mobile app scaffold included |
| Support Android and iOS | Cross-platform React Native code and native module integration guide included |
| Run on devices with 3 GB RAM | Target constraint documented; device validation still required |
| Target model size around 20 MB | Quantized model target documented; final binaries not claimed |
| Recognition and liveness under 1 second | Target documented; hardware benchmark still required |
| Use only open-source technologies | Open-source stack selected |
| Include offline liveness detection | Blink, smile, left turn, right turn liveness engine included |
| Include AWS sync-and-purge | API Gateway, Lambda, DynamoDB, S3, queue, and purge design included |
| Avoid unsupported benchmark claims | README and testing plan mark metrics as targets |
| Datalake 3.0 integration | Privacy-preserving ingestion mapping documented |
| iOS readiness | iOS build guide and native module checklist included |

## Evidence In Repository

| Evidence | Location |
|---|---|
| Mobile screens | `mobile/src/screens/` |
| Face pipeline | `mobile/src/services/face/` |
| Liveness engine | `mobile/src/services/liveness/` |
| Encrypted storage | `mobile/src/services/storage/` |
| Sync and purge | `mobile/src/services/sync/` |
| AWS backend | `backend/` |
| Tests | `mobile/__tests__/` |
| Judge documentation | `docs/` |
| Technical documentation | `docs/TECHNICAL_DOCUMENTATION.md` |
| Benchmark protocol | `docs/BENCHMARK_PROTOCOL.md` |
