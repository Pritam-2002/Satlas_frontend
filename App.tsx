import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, View } from 'react-native';
import { RootStackParamList } from './app/types/navigation.types';
import { AuthProvider, useAuth } from './app/context/AuthContext';

import SplashScreen from './app/screens/SplashScreen';
import LoginScreen from './app/screens/LoginScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ForgotPasswordScreen from './app/screens/ForgotPasswordScreen';
import MainTabNavigator from './app/navigation/MainTabNavigator';

// Keep the expo splash screen visible while we fetch resources
ExpoSplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

// Wrapper component for loading state
const LoadingScreen = () => {
  return <View style={{ flex: 1, backgroundColor: '#F8F9FB' }} />;
};

// Component to handle navigation based on auth state
const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "MainTabs" : "Welcome"}
      screenOptions={{ headerShown: false }}
    >
      {isAuthenticated ? (
        // Authenticated routes
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      ) : (
        // Unauthenticated routes
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Splash" component={SplashScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Urbanist': require('./assets/fonts/Urbanist-Regular.ttf'),
    'Urbanist-Regular': require('./assets/fonts/Urbanist-Regular.ttf'),
    'Urbanist-Medium': require('./assets/fonts/Urbanist-Medium.ttf'),
    'Inter': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the expo splash screen to hide immediately
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // Safe way to handle navigation container props based on platform
  const navigationProps = Platform.OS === 'web'
    ? { onReady: onLayoutRootView }
    : { onReady: onLayoutRootView };

  return (
    <AuthProvider>
      <NavigationContainer {...navigationProps}>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;