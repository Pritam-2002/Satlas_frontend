import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { WelcomeScreenNavigationProp } from '../types/navigation.types';

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  // Use the Gothic architecture image provided by the user
  // If the image fails to load, use a fallback background color
  const handleImageError = () => {
    console.log('Image failed to load');
    setImageLoaded(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      <View style={styles.imageContainer}>
        {imageLoaded ? (
          <Image
            source={require('../../assets/images/welcome-gothic.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
            onError={handleImageError}
          />
        ) : (
          <View style={[styles.backgroundImage, styles.fallbackBackground]} />
        )}
        {/* <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)', '#fff']}
          style={styles.gradient}
        /> */}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome To SATLAS!</Text>
          <Text style={styles.subtitle}>
            The only SAT app you need for SAT preparation{'\n'}
            and college admission support.
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.dotInactive]} />
            <View style={[styles.dot, styles.dotInactive]} />
            <View style={[styles.dot, styles.dotActive]} />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: height * 0.6,
    width: width,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  fallbackBackground: {
    backgroundColor: '#6D57FC',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  textContainer: {
    gap: 8,
  },
  title: {
    fontFamily: 'Urbanist',
    fontSize: 32,
    color: '#0C0A1C',
    letterSpacing: 0.48,
    lineHeight: 48,
  },
  subtitle: {
    fontFamily: 'Inter-Light',
    fontSize: 16,
    color: '#272727',
    letterSpacing: 0.24,
    lineHeight: 24,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotActive: {
    backgroundColor: '#6D57FC',
  },
  dotInactive: {
    borderWidth: 1,
    borderColor: '#6D57FC',
  },
  button: {
    backgroundColor: '#6D57FC',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 221,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.24,
  },
});

export default WelcomeScreen;