import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  testID?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'none',
  testID,
}) => {
  return (
    <View style={styles.inputContainer} testID={testID}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#868686"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
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
  input: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000000',
    paddingVertical: 8,
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Medium',
  },
  inputLine: {
    height: 1,
    backgroundColor: '#C9C9C9',
    marginTop: 5,
  },
});

export default CustomInput; 