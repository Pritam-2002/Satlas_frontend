import NoteEditIcon from 'assets/icons/home/Note-editIcon/NoteEditicon';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { ProgressBar } from 'react-native-paper'; // or use a custom View

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
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.topRow}>
        <View style={{ height: 35, width: 35, padding: 7, backgroundColor: "#dbe6ff", borderRadius: "50%" }}>
          <NoteEditIcon />
        </View>
        <TouchableOpacity style={styles.startBtn} >
          <Text style={styles.startText}>{actionbtntext}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardTitle}>{cardTitle}</Text>
      <Text style={styles.cardTitle2}>{cardTitle2}</Text>

      <View style={styles.progressWrapper}>
        <ProgressBar progress={Progresspercentage} color={ProgressBarColor} style={styles.progressBar} />
        <View style={[styles.progressTextWrapper, { backgroundColor: ProgressBarColor }]}>
          <Text style={styles.progressText}>{progressText}</Text>
        </View>
      </View>

      <Text style={styles.paperInfo}>{paperInfo}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    height: "auto",
    width: 180,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  startBtn: {
    backgroundColor: '#376AED',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  startText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#000',
  },
  cardTitle2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 1,
    color:"#000"
  },
  progressWrapper: {
    marginTop: 12,
    position: 'relative',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginBottom: 30
  },
  progressTextWrapper: {
    position: 'absolute',
    left: 0,
    top: 10,
    backgroundColor: '#FF6B00',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 10
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
  },
  paperInfo: {
    marginTop: 30,
    fontSize: 12,
    color: '#555',
  },
});

export default PracticeCard;
