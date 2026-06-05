# Sync And Purge Design

The FaceGuard mobile app authenticates personnel offline. Sync is a delayed audit workflow that runs only when connectivity returns.

## Flow

```mermaid
flowchart TD
  Offline["Offline"] --> LocalQueue["Local Queue"]
  LocalQueue --> Connectivity["Connectivity Restored"]
  Connectivity --> Upload["Upload"]
  Upload --> Verification["Verification"]
  Verification --> Delete["Delete Local Copy"]
```

## Detailed Sequence

```mermaid
sequenceDiagram
  participant App as Mobile App
  participant Queue as Encrypted Queue
  participant API as AWS API
  participant Lambda as Sync Lambda
  participant Store as DynamoDB / S3

  App->>Queue: Save offline event
  App->>Queue: Keep event encrypted
  App->>API: Upload batch when network returns
  API->>Lambda: Validate request
  Lambda->>Store: Write event and payload hash
  Lambda-->>App: Return acceptedIds
  App->>Queue: Purge accepted local copies
```

## Purge Rules

| Condition | Device Action |
|---|---|
| Backend returns accepted ID | Delete matching local queue record |
| Backend rejects event | Keep record and surface failure |
| Upload fails | Keep record and increment attempts |
| No connectivity | Do nothing |
| Partial success | Purge accepted records only |

## Why This Matters

This prevents data loss during poor connectivity and avoids storing unnecessary audit records after the central system has accepted them.

## AWS Components

- API Gateway receives `/sync/events`.
- Lambda validates events and writes accepted records.
- DynamoDB stores audit index and payload hash.
- S3 stores encrypted event payload archive.
- Mobile app purges only acknowledged event IDs.
