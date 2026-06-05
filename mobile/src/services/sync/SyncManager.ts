import {SECURITY_CONFIG} from '../../config/security';
import {SyncEvent, SyncResult} from '../../types/sync';
import {PurgeManager} from './PurgeManager';
import {QueueManager} from './QueueManager';

export type ConnectivityAdapter = {
  isConnected(): Promise<boolean>;
};

export type UploadAdapter = {
  upload(events: SyncEvent[]): Promise<{acceptedIds: string[]}>;
};

export class SyncManager {
  private readonly purgeManager: PurgeManager;

  constructor(
    private readonly queue: QueueManager,
    private readonly adapters: ConnectivityAdapter & UploadAdapter,
  ) {
    this.purgeManager = new PurgeManager(queue);
  }

  async syncAndPurge(): Promise<SyncResult> {
    if (!(await this.adapters.isConnected())) {
      return {uploaded: 0, purged: 0, failed: 0};
    }
    const events = await this.queue.list(SECURITY_CONFIG.syncBatchSize);
    if (events.length === 0) {
      return {uploaded: 0, purged: 0, failed: 0};
    }
    try {
      const response = await this.adapters.upload(events);
      const purged = await this.purgeManager.purgeAccepted(response.acceptedIds);
      return {
        uploaded: response.acceptedIds.length,
        purged,
        failed: events.length - response.acceptedIds.length,
      };
    } catch {
      await Promise.all(events.map(event => this.queue.markAttempt(event)));
      return {uploaded: 0, purged: 0, failed: events.length};
    }
  }
}
