import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  testID?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  testID,
}) => {
  return (
    <View style={styles.termsContainer} testID={testID}>
      <TouchableOpacity
        style={[styles.checkbox, checked && styles.checkboxChecked]}
        onPress={() => onChange(!checked)}
        activeOpacity={0.7}
      >
        {checked && <View style={styles.checkboxInner} />}
      </TouchableOpacity>
      <Text style={styles.termsText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#C5C6CC',
    borderRadius: 6,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#715CFD',
    backgroundColor: '#715CFD',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 3,
  },
  termsText: {
    color: '#71727A',
    fontSize: 12,
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Regular',
    flex: 1,
    lineHeight: 16,
  },
});

export default Checkbox;