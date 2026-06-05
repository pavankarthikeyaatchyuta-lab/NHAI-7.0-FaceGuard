import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Camera, useCameraDevice, useCameraPermission} from 'react-native-vision-camera';
import {PrimaryButton} from './PrimaryButton';

export function FaceCameraPreview(): React.JSX.Element {
  const device = useCameraDevice('front');
  const {hasPermission, requestPermission} = useCameraPermission();

  if (!hasPermission) {
    return (
      <View style={styles.empty}>
        <Text style={styles.text}>Camera permission is required for offline face capture.</Text>
        <PrimaryButton title="Allow Camera" onPress={() => void requestPermission()} />
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.empty}>
        <Text style={styles.text}>Front camera unavailable.</Text>
      </View>
    );
  }

  return <Camera style={styles.camera} device={device} isActive photo />;
}

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#0f1f24',
  },
  empty: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 8,
    backgroundColor: '#d8e3e0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 12,
  },
  text: {
    color: '#12343b',
    textAlign: 'center',
    fontSize: 15,
  },
});
