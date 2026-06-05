# Sync Events Lambda

Accepts encrypted-device audit events after connectivity returns and records a tamper-evident copy in DynamoDB and S3.

The Lambda returns `acceptedIds`; the mobile app purges only those IDs from its encrypted queue.
