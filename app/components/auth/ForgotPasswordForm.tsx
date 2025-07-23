import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import CustomInput from '../common/CustomInput';
import ActionButton from '../common/ActionButton';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  testID?: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
  testID,
}) => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResetPassword = (): void => {
    // Handle reset password logic here
    setIsLoading(true);
    console.log('Reset password for:', email);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
      alert('Password reset link sent to your email!');
    }, 1500);
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
        testID="forgot-password-email-input"
      />

      <Text style={styles.instructionText}>
        Enter your email address and we'll send you a link to reset your password
      </Text>

      {/* Reset Password Button */}
      <ActionButton
        title={isLoading ? "Sending..." : "Send Reset Link"}
        onPress={handleResetPassword}
        disabled={isLoading || !email}
        testID="reset-password-button"
        isGreen={true}
      />

      {/* Back to Login */}
      <TouchableOpacity
        style={styles.backToLoginContainer}
        onPress={onBackToLogin}
      >
        <Text style={styles.backToLoginText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2591',
    marginBottom: 20,
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Bold',
  },
  instructionText: {
    color: '#868686',
    fontSize: 14,
    marginBottom: 30,
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Regular',
  },
  backToLoginContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  backToLoginText: {
    color: '#376AED',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Medium',
  },
});

export default ForgotPasswordForm;
