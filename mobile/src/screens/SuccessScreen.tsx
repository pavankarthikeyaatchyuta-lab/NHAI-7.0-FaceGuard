import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text} from 'react-native';
import {PrimaryButton} from '../components/PrimaryButton';
import {Screen} from '../components/Screen';
import {StatusPill} from '../components/StatusPill';
import {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

export function SuccessScreen({route, navigation}: Props): React.JSX.Element {
  return (
    <Screen>
      <StatusPill label="Authenticated" tone="success" />
      <Text style={styles.title}>Access Approved</Text>
      <Text style={styles.copy}>
        {route.params.personnelId} verified locally with score {route.params.score.toFixed(2)}.
      </Text>
      <PrimaryButton title="Back to Enrollment" onPress={() => navigation.popToTop()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {fontSize: 28, fontWeight: '800', color: '#12343b'},
  copy: {fontSize: 16, color: '#35545b', lineHeight: 23},
});
