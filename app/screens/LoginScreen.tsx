import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LoginScreenNavigationProp } from '../types/navigation.types';
import SatlasLogo from '../components/common/SatlasLogo';
import BackgroundGradient from '../components/common/BackgroundGradient';
import TabMenu from '../components/common/TabMenu';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';


type TabType = 'login' | 'signup' | 'forgot-password';

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [activeTab, setActiveTab] = useState<TabType>('login');

  const handleForgotPassword = (): void => {
    // Switch to forgot password tab
    setActiveTab('forgot-password');
  };

  const handleCreateAccount = (): void => {
    // Switch to signup tab
    setActiveTab('signup');
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
            activeTab={activeTab}
            onTabChange={setActiveTab}
            testID="auth-tab-menu"
          />

          {/* Content container */}
          <View style={styles.contentContainer}>
            {activeTab === 'login' ? (
              <LoginForm
                onForgotPassword={handleForgotPassword}
                onCreateAccount={handleCreateAccount}
                testID="login-form"
              />
            ) : activeTab === 'signup' ? (
              <SignupForm testID="signup-form" />
            ) : (
              <ForgotPasswordForm
                onBackToLogin={() => setActiveTab('login')}
                testID="forgot-password-form"
              />
            )}
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

export default LoginScreen;