import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';

interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  showPassword: boolean;
  toggleShowPassword: () => void;
  testID?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  showPassword,
  toggleShowPassword,
  testID,
}) => {
  return (
    <View style={styles.inputContainer} testID={testID}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          placeholder={placeholder}
          placeholderTextColor="#868686"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <Text style={styles.showHideText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    color: '#868686',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Medium',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    color: '#000000',
    paddingVertical: 8,
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Medium',
  },
  showHideText: {
    color: '#376AED',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Medium',
  },
  inputLine: {
    height: 1,
    backgroundColor: '#C9C9C9',
    marginTop: 5,
  },
});

export default PasswordInput; 