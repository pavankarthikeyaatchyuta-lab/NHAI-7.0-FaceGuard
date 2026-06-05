import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import {DynamoDBDocumentClient, PutCommand} from '@aws-sdk/lib-dynamodb';
import {createHash} from 'node:crypto';

const tableName = process.env.SYNC_TABLE_NAME;
const bucketName = process.env.SYNC_BUCKET_NAME;
const region = process.env.AWS_REGION ?? 'ap-south-1';

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({region}));
const s3 = new S3Client({region});

export async function handler(apiEvent) {
  if (!tableName || !bucketName) {
    return response(500, {message: 'Backend environment is not configured'});
  }

  const authHeader = apiEvent.headers?.authorization ?? apiEvent.headers?.Authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return response(401, {message: 'Missing bearer token'});
  }

  const body = parseBody(apiEvent.body);
  if (!Array.isArray(body.events)) {
    return response(400, {message: 'Expected body.events array'});
  }

  const acceptedIds = [];
  const rejected = [];

  for (const event of body.events) {
    const validationError = validateSyncEvent(event);
    if (validationError) {
      rejected.push({id: event?.id ?? 'unknown', reason: validationError});
      continue;
    }

    const payloadHash = hashPayload(event.payload);
    await s3.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: `events/${event.personnelId}/${event.id}.json`,
      Body: JSON.stringify(event),
      ContentType: 'application/json',
      ServerSideEncryption: 'aws:kms',
    }));

    await dynamo.send(new PutCommand({
      TableName: tableName,
      Item: {
        pk: `PERSONNEL#${event.personnelId}`,
        sk: `EVENT#${event.occurredAt}#${event.id}`,
        id: event.id,
        type: event.type,
        occurredAt: event.occurredAt,
        payloadHash,
        acceptedAt: new Date().toISOString(),
      },
      ConditionExpression: 'attribute_not_exists(pk) AND attribute_not_exists(sk)',
    }).catch(error => {
      if (error.name === 'ConditionalCheckFailedException') {
        return undefined;
      }
      throw error;
    }));

    acceptedIds.push(event.id);
  }

  return response(202, {acceptedIds, rejected});
}

function parseBody(body) {
  if (!body) {
    return {};
  }
  return typeof body === 'string' ? JSON.parse(body) : body;
}

function validateSyncEvent(event) {
  if (!event || typeof event !== 'object') {
    return 'event must be an object';
  }
  for (const field of ['id', 'type', 'personnelId', 'occurredAt', 'payload']) {
    if (!(field in event)) {
      return `missing ${field}`;
    }
  }
  if (!['ENROLLMENT', 'AUTH_SUCCESS', 'AUTH_FAILURE', 'PURGE_CONFIRMATION'].includes(event.type)) {
    return 'invalid event type';
  }
  if (Number.isNaN(Date.parse(event.occurredAt))) {
    return 'invalid occurredAt timestamp';
  }
  return null;
}

function hashPayload(payload) {
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}

function response(statusCode, body) {
  return {
    statusCode,
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(body),
  };
}
