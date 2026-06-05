import {IdentityRecord} from '../../types/face';
import {SecureStore} from './SecureStore';

const PREFIX = 'identity:';

export class IdentityRepository {
  constructor(private readonly store: SecureStore) {}

  async save(record: IdentityRecord): Promise<void> {
    await this.store.setItem(`${PREFIX}${record.personnelId}`, JSON.stringify(record));
  }

  async find(personnelId: string): Promise<IdentityRecord | null> {
    const value = await this.store.getItem(`${PREFIX}${personnelId}`);
    return value ? (JSON.parse(value) as IdentityRecord) : null;
  }

  async remove(personnelId: string): Promise<void> {
    await this.store.removeItem(`${PREFIX}${personnelId}`);
  }
}
