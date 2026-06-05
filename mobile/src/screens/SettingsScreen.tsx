import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {Screen} from '../components/Screen';
import {SECURITY_CONFIG} from '../config/security';

export function SettingsScreen(): React.JSX.Element {
  return (
    <Screen>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Offline only mode</Text>
        <Switch value disabled />
      </View>
      <Text style={styles.item}>Recognition threshold: {SECURITY_CONFIG.embeddingThreshold}</Text>
      <Text style={styles.item}>Liveness threshold: {SECURITY_CONFIG.livenessPassThreshold}</Text>
      <Text style={styles.item}>Sync batch size: {SECURITY_CONFIG.syncBatchSize}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {fontSize: 26, fontWeight: '800', color: '#12343b'},
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  label: {fontSize: 16, color: '#12343b', fontWeight: '700'},
  item: {fontSize: 16, color: '#35545b'},
});
