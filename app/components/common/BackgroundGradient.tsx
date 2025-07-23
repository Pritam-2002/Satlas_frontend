import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BackgroundGradient: React.FC = () => {
  // Use a regular View with background color for web
  if (Platform.OS === 'web') {
    return <View style={styles.backgroundGradientWeb} />;
  }

  // Use LinearGradient for native platforms
  return (
    <LinearGradient
      colors={['#32C5FF', '#F7B500']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.backgroundGradient}
    />
  );
};

const styles = StyleSheet.create({
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  backgroundGradientWeb: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: '#32C5FF',
    // CSS gradient for web - simulated with a single color
  },
});

export default BackgroundGradient; 