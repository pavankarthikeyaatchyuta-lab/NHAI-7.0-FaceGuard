import React, {useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, TextInput, StyleSheet} from 'react-native';
import {FaceCameraPreview} from '../components/FaceCameraPreview';
import {PrimaryButton} from '../components/PrimaryButton';
import {Screen} from '../components/Screen';
import {StatusPill} from '../components/StatusPill';
import {RootStackParamList} from '../navigation/types';
import {FacePipeline} from '../services/face/FacePipeline';
import {IdentityRepository} from '../services/storage/IdentityRepository';
import {InMemorySecureStore} from '../services/storage/InMemorySecureStore';
import {QueueManager} from '../services/sync/QueueManager';

type Props = NativeStackScreenProps<RootStackParamList, 'Enrollment'>;

export function EnrollmentScreen({navigation}: Props): React.JSX.Element {
  const [personnelId, setPersonnelId] = useState('');
  const [status, setStatus] = useState('Ready for local enrollment');
  const services = useMemo(() => {
    const store = new InMemorySecureStore();
    return {
      pipeline: FacePipeline.createDemoPipeline(),
      identities: new IdentityRepository(store),
      queue: new QueueManager(store),
    };
  }, []);

  async function enroll() {
    setStatus('Capturing and embedding face locally...');
    const identity = await services.pipeline.enrollFromDemoFrame(personnelId.trim(), 'field-device');
    await services.identities.save(identity);
    await services.queue.enqueue({
      type: 'ENROLLMENT',
      personnelId: identity.personnelId,
      payload: {modelId: identity.embedding.modelId},
    });
    setStatus('Enrollment encrypted locally and queued for sync');
    navigation.navigate('Liveness', {personnelId: identity.personnelId});
  }

  return (
    <Screen>
      <StatusPill label="Offline mode" tone="success" />
      <Text style={styles.title}>Enroll Personnel</Text>
      <Text style={styles.copy}>Capture multiple frames, build a face embedding, encrypt it, and keep it on device.</Text>
      <FaceCameraPreview />
      <TextInput
        value={personnelId}
        onChangeText={setPersonnelId}
        autoCapitalize="characters"
        placeholder="Personnel ID"
        style={styles.input}
      />
      <PrimaryButton title="Start Enrollment" disabled={personnelId.trim().length < 3} onPress={enroll} />
      <PrimaryButton title="Sync Status" onPress={() => navigation.navigate('SyncStatus')} />
      <PrimaryButton title="Settings" onPress={() => navigation.navigate('Settings')} />
      <Text style={styles.status}>{status}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {fontSize: 28, fontWeight: '800', color: '#12343b'},
  copy: {fontSize: 16, color: '#35545b', lineHeight: 23},
  input: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9bb5af',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    fontSize: 16,
  },
  status: {color: '#35545b'},
});
