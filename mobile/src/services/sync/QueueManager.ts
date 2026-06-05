import {SyncEvent, SyncEventType} from '../../types/sync';
import {SecureStore} from '../storage/SecureStore';

const PREFIX = 'sync-event:';

export class QueueManager {
  constructor(private readonly store: SecureStore) {}

  async enqueue(input: Omit<SyncEvent, 'id' | 'attempts' | 'occurredAt'> & {type: SyncEventType}): Promise<SyncEvent> {
    const event: SyncEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      occurredAt: new Date().toISOString(),
      attempts: 0,
      ...input,
    };
    await this.store.setItem(`${PREFIX}${event.id}`, JSON.stringify(event));
    return event;
  }

  async list(limit = 25): Promise<SyncEvent[]> {
    const keys = await this.store.getAllKeys(PREFIX);
    const events = await Promise.all(keys.slice(0, limit).map(async key => this.store.getItem(key)));
    return events.filter(Boolean).map(value => JSON.parse(value as string) as SyncEvent);
  }

  async markAttempt(event: SyncEvent): Promise<void> {
    await this.store.setItem(`${PREFIX}${event.id}`, JSON.stringify({...event, attempts: event.attempts + 1}));
  }

  async remove(eventId: string): Promise<void> {
    await this.store.removeItem(`${PREFIX}${eventId}`);
  }
}
