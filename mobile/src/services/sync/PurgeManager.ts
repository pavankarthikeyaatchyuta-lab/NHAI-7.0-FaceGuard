import {QueueManager} from './QueueManager';

export class PurgeManager {
  constructor(private readonly queue: QueueManager) {}

  async purgeAccepted(acceptedIds: string[]): Promise<number> {
    await Promise.all(acceptedIds.map(id => this.queue.remove(id)));
    return acceptedIds.length;
  }
}
