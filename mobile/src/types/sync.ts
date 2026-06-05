export type SyncEventType = 'ENROLLMENT' | 'AUTH_SUCCESS' | 'AUTH_FAILURE' | 'PURGE_CONFIRMATION';

export type SyncEvent = {
  id: string;
  type: SyncEventType;
  personnelId: string;
  occurredAt: string;
  payload: Record<string, unknown>;
  attempts: number;
};

export type SyncResult = {
  uploaded: number;
  purged: number;
  failed: number;
};
