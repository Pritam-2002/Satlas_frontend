import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';

interface ActionButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  isGreen?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  title,
  disabled = false,
  isGreen = false,
  style,
  textStyle,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        isGreen && !disabled && styles.greenButton,
        isGreen && disabled && styles.greenButtonDisabled,
        !isGreen && disabled && styles.actionButtonDisabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
    >
      <Text style={[styles.actionButtonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: '#715CFD',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 5,
    marginBottom: 20,
  },
  greenButton: {
    backgroundColor: '#54D96C',
  },
  actionButtonDisabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0.05,
  },
  greenButtonDisabled: {
    backgroundColor: '#A8E5B5',
    shadowOpacity: 0.05,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-SemiBold',
  },
});

export default ActionButton;