import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({title, onPress, disabled}: Props): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [styles.button, disabled && styles.disabled, pressed && styles.pressed]}>
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: '#1f7a5a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    transform: [{scale: 0.99}],
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
