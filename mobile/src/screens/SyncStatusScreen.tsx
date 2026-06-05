import React, {useMemo, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {PrimaryButton} from '../components/PrimaryButton';
import {Screen} from '../components/Screen';
import {StatusPill} from '../components/StatusPill';
import {InMemorySecureStore} from '../services/storage/InMemorySecureStore';
import {QueueManager} from '../services/sync/QueueManager';
import {SyncManager} from '../services/sync/SyncManager';

export function SyncStatusScreen(): React.JSX.Element {
  const [message, setMessage] = useState('No connectivity required for authentication');
  const manager = useMemo(() => {
    const store = new InMemorySecureStore();
    const queue = new QueueManager(store);
    return new SyncManager(queue, {
      isConnected: async () => true,
      upload: async events => ({acceptedIds: events.map(event => event.id)}),
    });
  }, []);

  async function sync() {
    const result = await manager.syncAndPurge();
    setMessage(`Uploaded ${result.uploaded}, purged ${result.purged}, failed ${result.failed}`);
  }

  return (
    <Screen>
      <StatusPill label="Queue encrypted" tone="neutral" />
      <Text style={styles.title}>Offline Sync Status</Text>
      <Text style={styles.copy}>Queued authentication events upload only when connectivity returns and are purged after server acceptance.</Text>
      <PrimaryButton title="Run Sync Check" onPress={sync} />
      <Text style={styles.status}>{message}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {fontSize: 26, fontWeight: '800', color: '#12343b'},
  copy: {fontSize: 16, color: '#35545b', lineHeight: 23},
  status: {color: '#35545b'},
});
