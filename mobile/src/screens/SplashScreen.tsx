import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({navigation}: Props): React.JSX.Element {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Enrollment'), 900);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FaceGuard</Text>
      <Text style={styles.subtitle}>Offline field authentication</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12343b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '800',
  },
  subtitle: {
    color: '#d7f0e4',
    fontSize: 16,
    marginTop: 8,
  },
});
