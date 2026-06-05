import React, {useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text} from 'react-native';
import {FaceCameraPreview} from '../components/FaceCameraPreview';
import {PrimaryButton} from '../components/PrimaryButton';
import {Screen} from '../components/Screen';
import {RootStackParamList} from '../navigation/types';
import {FacePipeline} from '../services/face/FacePipeline';

type Props = NativeStackScreenProps<RootStackParamList, 'FaceVerification'>;

export function FaceVerificationScreen({route, navigation}: Props): React.JSX.Element {
  const [status, setStatus] = useState('Ready to verify local embedding');
  const pipeline = useMemo(() => FacePipeline.createDemoPipeline(), []);

  async function verify() {
    const result = await pipeline.verifyDemoFrame(route.params.personnelId);
    setStatus(`Similarity score ${result.score.toFixed(2)}`);
    if (result.matched) {
      navigation.navigate('Success', {personnelId: route.params.personnelId, score: result.score});
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Face Verification</Text>
      <Text style={styles.copy}>A lightweight embedding is compared against the encrypted local identity record.</Text>
      <FaceCameraPreview />
      <PrimaryButton title="Verify Face" onPress={verify} />
      <Text style={styles.status}>{status}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {fontSize: 26, fontWeight: '800', color: '#12343b'},
  copy: {fontSize: 16, color: '#35545b', lineHeight: 23},
  status: {color: '#35545b'},
});
