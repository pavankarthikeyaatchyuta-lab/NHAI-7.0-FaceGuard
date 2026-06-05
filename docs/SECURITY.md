# Security And Threat Model

FaceGuard is designed for offline biometric authentication, so the device must protect embeddings, logs, and queued sync events even when there is no network.

## Threat Model

| Threat | Mitigation |
|---|---|
| Photo spoof | Blink challenge and texture scoring |
| Video replay | Random gesture sequence and replay-risk scoring |
| Data theft | AES-256-GCM encrypted local records |
| Log tampering | Payload hash verification during sync |
| Stolen device | Platform keychain storage and device-bound keys |
| Network interception | HTTPS sync endpoint and future certificate pinning |
| Replay upload | Unique event IDs and idempotent backend writes |
| Model substitution | Model ID tracking and planned signed model bundles |

## Local Data Protection

- Raw camera frames are processed in memory.
- Face embeddings are encrypted before storage.
- Authentication logs and sync queue records use the same encrypted storage boundary.
- Local purge happens only after backend acknowledgement.

## Liveness Strategy

FaceGuard combines active and passive signals:

- Blink: eye-open probabilities should drop during the blink challenge.
- Smile: smile probability should rise during the smile challenge.
- Head turns: yaw should move left or right as requested.
- Anti-photo: texture score should remain above threshold.
- Anti-replay: replay-risk score should remain low.

## Backend Security

- Sync events are validated before acceptance.
- Payload hashes are written to DynamoDB.
- Full event payloads are archived to encrypted S3.
- Duplicate uploads are handled idempotently.
- Accepted event IDs are returned to the device for local purge.

## Security Roadmap

- Add signed sync payloads.
- Add certificate pinning.
- Add device attestation.
- Add signed model bundle verification.
- Add admin review for suspicious liveness failures.
