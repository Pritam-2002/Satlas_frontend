import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TestCardProps {
  title: string;
  subject: string;
  level: string;
  duration: string;
  status: 'completed' | 'available' | 'locked';
  onPress: () => void;
}

const TestCard: React.FC<TestCardProps> = ({ 
  title, 
  subject, 
  level, 
  duration, 
  status, 
  onPress 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'available':
        return '#3B82F6';
      case 'locked':
        return '#6B7280';
      default:
        return '#3B82F6';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'available':
        return 'play-circle';
      case 'locked':
        return 'lock-closed';
      default:
        return 'play-circle';
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.testCard,
        status === 'locked' && styles.lockedCard
      ]} 
      onPress={onPress}
      disabled={status === 'locked'}
      activeOpacity={0.8}
    >
      {/* Card Content - Single Row Layout */}
      <View style={styles.cardContent}>
        {/* Left Side - Icon */}
        <View style={[styles.iconContainer, { backgroundColor: getStatusColor() + '20' }]}>
          <Icon name="document-text" size={24} color={getStatusColor()} />
        </View>
        
        {/* Middle - Title and Badges */}
        <View style={styles.middleContainer}>
          <Text style={styles.testTitle} numberOfLines={1}>{title}</Text>
          <View style={styles.badgesRow}>
            <View style={[styles.levelBadge, getLevelBadgeStyle(level)]}>
              <Text style={[styles.levelText, getLevelTextStyle(level)]}>{level}</Text>
            </View>
            <View style={styles.subjectBadge}>
              <Text style={styles.subjectText}>{subject}</Text>
            </View>
          </View>
        </View>
        
        {/* Right Side - Play Button */}
        <View style={[styles.statusIcon, { backgroundColor: getStatusColor() }]}>
          <Icon name={getStatusIcon()} size={16} color="#FFFFFF" />
        </View>
      </View>

      {/* Progress indicator for completed tests */}
      {status === 'completed' && (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { backgroundColor: getStatusColor() }]} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const getLevelBadgeStyle = (level: string) => {
  switch (level) {
    case 'Level 1':
      return { backgroundColor: '#DBEAFE' };
    case 'Level 2':
      return { backgroundColor: '#FEF3C7' };
    case 'Level 3':
      return { backgroundColor: '#FEE2E2' };
    default:
      return { backgroundColor: '#F3F4F6' };
  }
};

const getLevelTextStyle = (level: string) => {
  switch (level) {
    case 'Level 1':
      return { color: '#1E40AF' };
    case 'Level 2':
      return { color: '#D97706' };
    case 'Level 3':
      return { color: '#DC2626' };
    default:
      return { color: '#374151' };
  }
};

const styles = StyleSheet.create({
  testCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  lockedCard: {
    opacity: 0.6,
    backgroundColor: '#F8FAFC',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  testTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  levelBadge: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  subjectBadge: {
    backgroundColor: '#EDE9FE',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  subjectText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#7C3AED',
    fontFamily: 'Poppins-Medium',
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    borderRadius: 2,
  },
});

export default TestCard;
