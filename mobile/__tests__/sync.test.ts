import {describe, expect, it} from 'vitest';
import {InMemorySecureStore} from '../src/services/storage/InMemorySecureStore';
import {QueueManager} from '../src/services/sync/QueueManager';
import {SyncManager} from '../src/services/sync/SyncManager';

describe('SyncManager', () => {
  it('uploads queued events and purges accepted records', async () => {
    const store = new InMemorySecureStore();
    const queue = new QueueManager(store);
    const event = await queue.enqueue({type: 'AUTH_SUCCESS', personnelId: 'NHAI-1', payload: {score: 0.91}});
    const sync = new SyncManager(queue, {
      isConnected: async () => true,
      upload: async events => ({acceptedIds: events.map(item => item.id)}),
    });

    const result = await sync.syncAndPurge();

    expect(result).toEqual({uploaded: 1, purged: 1, failed: 0});
    expect(await store.getItem(`sync-event:${event.id}`)).toBeNull();
  });
});
