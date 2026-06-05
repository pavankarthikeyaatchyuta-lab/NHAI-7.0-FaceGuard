import AsyncStorage from '@react-native-async-storage/async-storage';
import {Buffer} from 'buffer';
import {randomBytes, createCipheriv, createDecipheriv} from 'react-native-quick-crypto';
import * as Keychain from 'react-native-keychain';
import {SECURITY_CONFIG} from '../../config/security';
import {SecureStore} from './SecureStore';

export class ReactNativeEncryptedStore implements SecureStore {
  async getItem(key: string): Promise<string | null> {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) {
      return null;
    }
    return this.decrypt(encrypted);
  }

  async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, await this.encrypt(value));
  }

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  async getAllKeys(prefix: string): Promise<string[]> {
    const keys = await AsyncStorage.getAllKeys();
    return keys.filter(key => key.startsWith(prefix));
  }

  private async encrypt(plainText: string): Promise<string> {
    const key = await this.getOrCreateKey();
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return JSON.stringify({
      iv: iv.toString('base64'),
      tag: tag.toString('base64'),
      data: encrypted.toString('base64'),
    });
  }

  private async decrypt(payload: string): Promise<string> {
    const key = await this.getOrCreateKey();
    const parsed = JSON.parse(payload) as {iv: string; tag: string; data: string};
    const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(parsed.iv, 'base64'));
    decipher.setAuthTag(Buffer.from(parsed.tag, 'base64'));
    return Buffer.concat([
      decipher.update(Buffer.from(parsed.data, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  }

  private async getOrCreateKey(): Promise<Buffer> {
    const existing = await Keychain.getGenericPassword({service: SECURITY_CONFIG.keyAlias});
    if (existing) {
      return Buffer.from(existing.password, 'base64');
    }
    const key = randomBytes(32);
    await Keychain.setGenericPassword('faceguard', key.toString('base64'), {
      service: SECURITY_CONFIG.keyAlias,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
    return key;
  }
}
