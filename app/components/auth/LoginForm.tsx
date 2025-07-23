import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, ActivityIndicator, Alert } from 'react-native';
import CustomInput from '../common/CustomInput';
import PasswordInput from '../common/PasswordInput';
import ActionButton from '../common/ActionButton';
import { useAuth } from '../../context/AuthContext';

interface LoginFormProps {
  onForgotPassword: () => void;
  onCreateAccount: () => void;
  testID?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onForgotPassword,
  onCreateAccount,
  testID,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { login, isLoading, error } = useAuth();

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await login(email, password);
      // No need to navigate - AppNavigator will handle this automatically
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'An error occurred during login');
    }
  };

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <View testID={testID}>
      {/* Email Input */}
      <CustomInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        testID="login-email-input"
      />

      {/* Password Input */}
      <PasswordInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
        testID="login-password-input"
      />

      {/* Forgot Password */}
      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={onForgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot password</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <ActionButton
        title={isLoading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={!email || !password || isLoading}
        testID="login-button"
      />

      {isLoading && (
        <ActivityIndicator size="small" color="#715CFD" style={styles.loader} />
      )}

      {/* Create Account */}
      <TouchableOpacity
        style={styles.createAccountContainer}
        onPress={onCreateAccount}
      >
        <Text style={styles.createAccountText}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#376AED',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Medium',
  },
  createAccountContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  createAccountText: {
    color: '#376AED',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Medium',
  },
  loader: {
    marginVertical: 10,
  },
});

export default LoginForm;