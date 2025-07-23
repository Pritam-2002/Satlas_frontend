import React from 'react';
import { View, StyleSheet } from 'react-native';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  testID?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  testID,
}) => {
  return (
    <View style={styles.indicatorContainer} testID={testID}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        
        return (
          <View 
            key={index} 
            style={[
              styles.indicator,
              isActive && styles.indicatorActive,
              isCompleted && styles.indicatorCompleted,
              !isActive && !isCompleted && styles.indicatorInactive
            ]} 
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    height: 6,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  indicatorActive: {
    width: 30,
    backgroundColor: '#E8ECF4',
  },
  indicatorInactive: {
    width: 6,
    height: 6,
    backgroundColor: '#E8ECF4',
    borderRadius: 100,
  },
  indicatorCompleted: {
    width: 6,
    backgroundColor: '#54D96C', // Green for completed steps
  },
});

export default StepIndicator; 