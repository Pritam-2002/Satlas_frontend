import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { ForgotPasswordScreenNavigationProp } from '../types/navigation.types';
import SatlasLogo from '../components/common/SatlasLogo';
import BackgroundGradient from '../components/common/BackgroundGradient';
import TabMenu from '../components/common/TabMenu';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const handleBackToLogin = (): void => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background gradient */}
      <BackgroundGradient />

      {/* Main content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <SatlasLogo />

          {/* Tab Menu */}
          <TabMenu
            activeTab="forgot-password"
            onTabChange={() => { }}  // No tab change functionality needed here
            testID="forgot-password-tab-menu"
          />

          {/* Content container */}
          <View style={styles.contentContainer}>
            <ForgotPasswordForm
              onBackToLogin={handleBackToLogin}
              testID="forgot-password-form"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mainContainer: {
    flex: 1,
    marginTop: 80,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    flex: 1,
    zIndex: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    borderTopWidth: 0,
    marginTop: -20, // To eliminate any possible gap
  },
});

export default ForgotPasswordScreen; 