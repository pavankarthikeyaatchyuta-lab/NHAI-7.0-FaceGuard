import {SecureStore} from './SecureStore';

export class InMemorySecureStore implements SecureStore {
  private readonly values = new Map<string, string>();

  async getItem(key: string): Promise<string | null> {
    return this.values.get(key) ?? null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.values.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.values.delete(key);
  }

  async getAllKeys(prefix: string): Promise<string[]> {
    return [...this.values.keys()].filter(key => key.startsWith(prefix));
  }
}
