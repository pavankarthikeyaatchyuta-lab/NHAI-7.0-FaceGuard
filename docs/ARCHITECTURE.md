# FaceGuard Architecture

FaceGuard is built around a strict offline-first authentication boundary. The mobile app performs face capture, liveness verification, embedding generation, encrypted storage, and identity matching locally. Cloud services are used only after connectivity returns for audit sync and purge acknowledgement.

## Offline Authentication Flow

```mermaid
flowchart TD
  Camera["Camera"] --> Detection["Face Detection"]
  Detection --> Liveness["Liveness Detection"]
  Liveness --> Embedding["Face Embedding"]
  Embedding --> Storage["Local Encrypted Storage"]
  Storage --> Verification["Verification"]
  Verification --> Decision["Authenticate / Reject"]
```

## Sync And Purge Flow

```mermaid
flowchart TD
  Restored["Network Restored"] --> Queue["Sync Queue"]
  Queue --> AWS["AWS"]
  AWS --> Verify["Server Verification"]
  Verify --> Purge["Purge Local Data"]
```

## Complete System View

```mermaid
flowchart LR
  subgraph Device["Field Device"]
    Camera["Camera"]
    Detect["Face Detection"]
    Live["Challenge Liveness"]
    Embed["MobileFaceNet / InsightFace Embedding"]
    Store["AES Encrypted Local Store"]
    Queue["Encrypted Sync Queue"]
  end

  subgraph Cloud["AWS Sync Layer"]
    Api["API Gateway"]
    Lambda["Sync Lambda"]
    Ddb["DynamoDB Audit Index"]
    S3["Encrypted S3 Event Archive"]
  end

  Camera --> Detect --> Live --> Embed --> Store
  Store --> Queue
  Queue --> Api --> Lambda
  Lambda --> Ddb
  Lambda --> S3
  Lambda --> Queue
```

## Module Responsibilities

| Module | Responsibility |
|---|---|
| Camera | Captures live frames through React Native Vision Camera |
| Face Detection | Finds the primary face and landmark points |
| Face Alignment | Produces a normalized 112 x 112 face crop |
| Liveness | Scores blink, smile, head turns, texture, and replay risk |
| Embedding | Runs lightweight ONNX model inference |
| Storage | Encrypts embeddings, logs, and sync queue records |
| Sync | Uploads queued events after connectivity returns |
| Purge | Deletes only records acknowledged by the backend |

## Target Constraints

These are engineering targets, not claimed benchmark results:

- Fully offline authentication.
- Android and iOS support through React Native.
- 3 GB RAM device compatibility.
- Model footprint around 20 MB after quantization.
- Recognition and liveness under 1 second after hardware validation.
