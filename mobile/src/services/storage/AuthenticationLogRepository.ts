import {SecureStore} from './SecureStore';

export type AuthenticationLog = {
  id: string;
  personnelId: string;
  occurredAt: string;
  result: 'SUCCESS' | 'FAILURE';
  similarityScore: number;
  livenessScore: number;
  deviceId: string;
};

const PREFIX = 'auth-log:';

export class AuthenticationLogRepository {
  constructor(private readonly store: SecureStore) {}

  async append(input: Omit<AuthenticationLog, 'id' | 'occurredAt'>): Promise<AuthenticationLog> {
    const log: AuthenticationLog = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      occurredAt: new Date().toISOString(),
      ...input,
    };
    await this.store.setItem(`${PREFIX}${log.id}`, JSON.stringify(log));
    return log;
  }

  async list(limit = 100): Promise<AuthenticationLog[]> {
    const keys = await this.store.getAllKeys(PREFIX);
    const values = await Promise.all(keys.slice(0, limit).map(key => this.store.getItem(key)));
    return values.filter(Boolean).map(value => JSON.parse(value as string) as AuthenticationLog);
  }
}
