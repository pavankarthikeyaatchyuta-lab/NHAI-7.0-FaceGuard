import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  label: string;
  tone: 'neutral' | 'success' | 'warning';
};

export function StatusPill({label, tone}: Props): React.JSX.Element {
  return (
    <View style={[styles.pill, styles[tone]]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  neutral: {
    backgroundColor: '#d8e3e0',
  },
  success: {
    backgroundColor: '#c8ead8',
  },
  warning: {
    backgroundColor: '#ffe1b3',
  },
  text: {
    color: '#12343b',
    fontSize: 13,
    fontWeight: '700',
  },
});
