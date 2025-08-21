import NoteEditIcon from 'assets/icons/home/Note-editIcon/NoteEditicon';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type PracticeCardProps = {
  actionbtntext: any;
  cardTitle: string;
  cardTitle2: string;
  progressText: string;
  paperInfo: string;
  Progresspercentage: number;
  ProgressBarColor?: string;
  onPress: () => void;
};

const PracticeCard = ({ actionbtntext, cardTitle, cardTitle2, progressText, paperInfo, Progresspercentage, ProgressBarColor, onPress }: PracticeCardProps) => {
  const isSmallDevice = wp('100%') < 350;
  const cardWidth = wp('100%') < 400 ? wp('42%') : wp('45%');
  return (
    <Pressable style={[styles.card, { width: cardWidth }]} onPress={onPress}>
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <NoteEditIcon />
        </View>
        <TouchableOpacity style={styles.startBtn}>
          <Text style={styles.startText} numberOfLines={1}>{actionbtntext}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardTitle} numberOfLines={1}>{cardTitle}</Text>
      <Text style={styles.cardTitle2} numberOfLines={1}>{cardTitle2}</Text>

      <View style={styles.progressWrapper}>
        <ProgressBar progress={Progresspercentage} color={ProgressBarColor} style={styles.progressBar} />
        <View style={[styles.progressTextWrapper, { backgroundColor: ProgressBarColor }]}>
          <Text style={styles.progressText}>{progressText}</Text>
        </View>
      </View>

      <Text style={styles.paperInfo} numberOfLines={1}>{paperInfo}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2.5%'),
    minHeight: hp('20%'),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: hp('0.3%') },
    shadowRadius: wp('1%'),
    elevation: 3,
    marginVertical: hp('1%'),
  },
  iconContainer: {
    height: wp('100%') < 350 ? wp('8%') : wp('9%'),
    width: wp('100%') < 350 ? wp('8%') : wp('9%'),
    padding: wp('100%') < 350 ? wp('1.5%') : wp('2%'),
    backgroundColor: '#dbe6ff',
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },

  startBtn: {
    backgroundColor: '#376AED',
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2.5%'),
    maxWidth: wp('25%'),
  },
  startText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RFValue(10),
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginTop: hp('1%'),
    color: 'black',
    lineHeight: RFValue(16),
  },
  cardTitle2: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginTop: hp('0.5%'),
    color: 'black',
    lineHeight: RFValue(16),
  },
  progressWrapper: {
    marginTop: hp('2%'),
    position: 'relative',
  },
  progressBar: {
    height: hp('1%'),
    borderRadius: wp('1%'),
    backgroundColor: '#f0f0f0',
    marginBottom: hp('4%'),
  },
  progressTextWrapper: {
    position: 'absolute',
    left: 0,
    top: hp('2%'),
    backgroundColor: '#FF6B00',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('2.5%'),
    marginTop: hp('0.5%'),
  },
  progressText: {
    color: '#fff',
    fontSize: RFValue(10),
  },
  paperInfo: {
    marginTop: hp('3%'),
    fontSize: RFValue(10),
    color: '#555',
    lineHeight: RFValue(12),
  },
});

export default PracticeCard;
