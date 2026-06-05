# Demo Flow

Use this sequence for a judge-facing walkthrough.

## Flow

| Step | Action | What It Demonstrates |
|---|---|---|
| 1 | Open app | React Native field-ready mobile workflow |
| 2 | Enroll personnel | Offline capture and encrypted local identity record |
| 3 | Run blink challenge | Active liveness against photo spoof |
| 4 | Run smile and head-turn challenges | Random gesture defense against replay |
| 5 | Verify face | Local embedding comparison without network |
| 6 | Enable offline mode | Authentication remains device-local |
| 7 | Restore network | Sync queue uploads audit event |
| 8 | Confirm purge | Local queue deletes accepted event only |

## Talking Points

- FaceGuard makes the authentication decision locally.
- AWS is used for delayed audit sync, not for live identity verification.
- The repository avoids unproven accuracy or latency claims.
- The design maps directly to NHAI field conditions where connectivity is unreliable.
