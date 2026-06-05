import React, {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

export function Screen({children}: PropsWithChildren): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f6f8f7',
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
});
