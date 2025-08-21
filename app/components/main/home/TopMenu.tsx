import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const topMenuItems = [
  { label: 'SAT Library', icon: 'bookshelf' },
  { label: 'Exam Dates', icon: 'calendar' },
  { label: 'Registration', icon: 'laptop' },
  { label: 'Scholarships', icon: 'cash-multiple' },
  { label: 'Daily Quiz', icon: 'brain' },
  { label: 'Book Demo', icon: 'video' },
  { label: 'AI Reports', icon: 'robot' },
  { label: '', icon: '', isEmpty: true }, // Empty placeholder item
];

const MenuGrid = () => {
  const navigation = useNavigation<any>();
  
  const handlePress = (label: string) => {
    switch (label) {
      case 'SAT Library':
        navigation.navigate('SatLibaryPage');
        break;
      case 'Exam Dates':
        navigation.navigate('ExamDatePage');
        break;
      case 'Registration':
        navigation.navigate('RegistrationScreen');
        break;
      case 'Scholarships':
        navigation.navigate('Scholarships');
        break;
      case 'Daily Quiz':
        navigation.navigate('DailyQuiz');
        break;
      case 'Book Demo':
        navigation.navigate('BookDemoPage');
        break;
      case 'AI Reports':
        navigation.navigate('ComingSoonPage');
        break;
      default:
        break;
    }
  };

  const firstRow = topMenuItems.slice(0, 4);
  const secondRow = topMenuItems.slice(4);
  
  const isSmallDevice = wp('100%') < 350;
  const iconSize = isSmallDevice ? wp('6%') : wp('7%');
  const circleSize = isSmallDevice ? wp('9%') : wp('10%');

  const renderMenuItem = (item: any, index: number) => (
    <View style={styles.gridItem} key={index}>
      {item.isEmpty ? (
        // Empty placeholder - just takes up space
        <View style={styles.pressableArea} />
      ) : (
        <Pressable style={styles.pressableArea} onPress={() => handlePress(item.label)}>
          <View style={[styles.iconCircle, { width: circleSize, height: circleSize }]}>
            <Icon name={item.icon} size={iconSize} color="#4A90E2" />
          </View>
          <Text style={styles.menuText} numberOfLines={2}>{item.label}</Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {firstRow.map((item, index) => renderMenuItem(item, index))}
      </View>
      <View style={styles.row}>
        {secondRow.map((item, index) => renderMenuItem(item, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('1%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
   
  },
  gridItem: {
    flex: 1,
    maxWidth: wp('25%'),
    alignItems: 'center',
    marginHorizontal: wp('1%'),
  },
  pressableArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('20%'),
    paddingVertical: hp('1%'),
  },
  iconCircle: {
    borderRadius: wp('6%'),
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.3%') },
    shadowOpacity: 0.1,
    shadowRadius: wp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
  },
  menuText: {
    fontSize: RFValue(10),
    textAlign: 'center',
    color: 'black',
    lineHeight: RFValue(12),
    minHeight: hp('3%'),
  },
});

export default MenuGrid;