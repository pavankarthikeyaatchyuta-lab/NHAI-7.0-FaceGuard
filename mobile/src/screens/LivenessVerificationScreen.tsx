import React, {useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text} from 'react-native';
import {FaceCameraPreview} from '../components/FaceCameraPreview';
import {PrimaryButton} from '../components/PrimaryButton';
import {Screen} from '../components/Screen';
import {RootStackParamList} from '../navigation/types';
import {LivenessEngine} from '../services/liveness/LivenessEngine';
import {defaultChallengeSet} from '../services/liveness/challenges';

type Props = NativeStackScreenProps<RootStackParamList, 'Liveness'>;

export function LivenessVerificationScreen({route, navigation}: Props): React.JSX.Element {
  const [status, setStatus] = useState('Challenge sequence ready');
  const engine = useMemo(() => new LivenessEngine(defaultChallengeSet), []);

  function runDemoCheck() {
    const result = engine.evaluate([
      {challenge: 'BLINK', leftEyeOpen: 0.12, rightEyeOpen: 0.16, smiling: 0.1, yaw: 0, textureScore: 0.82, replayRisk: 0.1},
      {challenge: 'SMILE', leftEyeOpen: 0.8, rightEyeOpen: 0.83, smiling: 0.78, yaw: 1, textureScore: 0.81, replayRisk: 0.1},
      {challenge: 'TURN_LEFT', leftEyeOpen: 0.74, rightEyeOpen: 0.76, smiling: 0.2, yaw: -19, textureScore: 0.8, replayRisk: 0.12},
      {challenge: 'TURN_RIGHT', leftEyeOpen: 0.78, rightEyeOpen: 0.79, smiling: 0.15, yaw: 21, textureScore: 0.83, replayRisk: 0.08},
    ]);
    setStatus(`Liveness score ${result.score.toFixed(2)} (${result.passed ? 'passed' : 'failed'})`);
    if (result.passed) {
      navigation.navigate('FaceVerification', {personnelId: route.params.personnelId});
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Liveness Verification</Text>
      <Text style={styles.copy}>Blink, smile, and turn your head as prompted. Frames stay on device.</Text>
      <FaceCameraPreview />
      <PrimaryButton title="Run Challenge Sequence" onPress={runDemoCheck} />
      <Text style={styles.status}>{status}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {fontSize: 26, fontWeight: '800', color: '#12343b'},
  copy: {fontSize: 16, color: '#35545b', lineHeight: 23},
  status: {color: '#35545b'},
});
