import {SyncEvent} from '../../types/sync';
import {UploadAdapter} from './SyncManager';

export class AwsUploadAdapter implements UploadAdapter {
  constructor(
    private readonly endpointUrl: string,
    private readonly authTokenProvider: () => Promise<string>,
  ) {}

  async upload(events: SyncEvent[]): Promise<{acceptedIds: string[]}> {
    const response = await fetch(this.endpointUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${await this.authTokenProvider()}`,
      },
      body: JSON.stringify({events}),
    });
    if (!response.ok) {
      throw new Error(`Sync upload failed with ${response.status}`);
    }
    return (await response.json()) as {acceptedIds: string[]};
  }
}
