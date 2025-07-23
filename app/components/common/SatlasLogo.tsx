import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const SatlasLogo: React.FC = () => {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.logoBackground}>
        <Text style={styles.logoText}>SATLAS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBackground: {
    backgroundColor: '#1F2591',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Bold',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default SatlasLogo; 