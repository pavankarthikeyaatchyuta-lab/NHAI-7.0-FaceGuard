# Testing Plan

FaceGuard avoids unverified benchmark claims. This plan lists the tests required before claiming production metrics.

## Planned Functional Tests

| Area | Test |
|---|---|
| Enrollment | Capture multiple frames and store encrypted embedding |
| Liveness | Pass blink, smile, left turn, and right turn challenges |
| Verification | Match enrolled user and reject non-matching user |
| Offline mode | Authenticate with airplane mode enabled |
| Sync | Queue events offline and upload after network returns |
| Purge | Delete only backend-accepted local records |

## Environmental Tests

| Scenario | Purpose |
|---|---|
| Bright sunlight | Validate glare and high exposure handling |
| Low light | Validate face detection and liveness stability |
| Backlit face | Validate capture guidance and rejection behavior |
| Glasses | Validate landmarks and blink detection |
| Masks or helmets | Validate expected rejection and operator messaging |
| Moving vehicle | Validate capture stability during field use |

## Demographic Coverage Plan

The validation dataset should include consented participants across:

- Different skin tones.
- Different age groups.
- Different genders.
- Facial hair variation.
- Glasses and no-glasses cases.
- Indoor and outdoor conditions.

No demographic performance claims should be made until this testing is complete.

## Metrics To Measure

| Metric | Notes |
|---|---|
| False accept rate | Measure against non-matching personnel |
| False reject rate | Measure for enrolled personnel |
| Liveness attack pass rate | Test photo and screen replay attempts |
| End-to-end latency | Measure on target 3 GB RAM devices |
| Model size | Measure final quantized model files |
| Memory use | Measure during camera and ONNX inference |

## Reporting Rule

Report measured results only with:

- Device model.
- OS version.
- App build version.
- Model version.
- Dataset size.
- Test protocol.
