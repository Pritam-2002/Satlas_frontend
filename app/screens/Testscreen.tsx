import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomestackNavigator';
import { QuestionPaper } from '../types/question';
import quizService from '../services/quizService';

// Test Card Component matching Figma design
const TestCard = ({ title, subject, level, duration, status, onPress }: {
  title: string;
  subject: string;
  level: string;
  duration: string;
  status: 'completed' | 'available' | 'locked';
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.testCard} onPress={onPress}>
      {/* Left side - Icon and main content */}
      <View style={styles.cardLeftContent}>
        {/* Clipboard Icon */}
        <View style={styles.clipboardIcon}>
          <Icon name="clipboard" size={24} color="#5C5C99" />
        </View>
        
        {/* Main content */}
        <View style={styles.mainContent}>
          <Text style={styles.testTitle}>{title}</Text>
          
          {/* Badges row */}
          <View style={styles.badgesRow}>
            <View style={[styles.levelBadge, level === 'Level 2' && styles.levelBadge2]}>
              <Text style={styles.levelText}>{level}</Text>
            </View>
            <View style={styles.subjectBadge}>
              <Text style={styles.subjectText}>{subject}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Right side - Duration and trophy */}
      <View style={styles.cardRightContent}>
        {/* <Text style={styles.durationText}>{duration}</Text> */}
        <View style={styles.trophyIcon}>
          <Icon name="trophy" size={20} color="#339657" />
        </View>
      </View>

      {/* Status indicator - top right corner */}
      {status === 'completed' && (
        <View style={styles.statusIndicator}>
          <Icon name="checkmark" size={12} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const TestScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [questionPaper, setQuestionPaper] = useState<QuestionPaper[]>([]);
  const [questionId, setQuestionId] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestionPaper = async () => {
      const questionPaper = await quizService.getQuestionPaper();
      console.log("questionPaper in test screen", questionPaper);
      

      setQuestionPaper(questionPaper.result);
      console.log("questionPaper in testt", questionPaper.result);
      const allQuestionIds = questionPaper.result.flatMap(paper => paper.questionsID);
       setQuestionId(allQuestionIds);
      console.log("allQuestionIds in test screen", allQuestionIds);
    };
    fetchQuestionPaper();
    console.log("questionPaper in test screen", questionPaper);
  }, []);
  const handleTestPress = (testId: string) => {
    const joinedQuestionId = questionId.join(',');
    navigation.navigate('TestInterface', { joinedQuestionId, questionPaperId: testId });
  };

  const filteredQuestionPaper = questionPaper.filter((test) => test.type.includes('practice'));

  return (
    <LinearGradient
      colors={['#dbe6ff', '#ffffff']} // light blue to white
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-circle" size={30} color="#376AED" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>SAT Dashboard</Text>
          </View>

          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.notificationButton}>
              <View style={styles.notificationIcon}>
                <Icon name="notifications-outline" size={20} color="#FFFFFF" />
                <View style={styles.notificationBadge} />
              </View>
            </TouchableOpacity>

            <View style={styles.avatarContainer}>
              <Icon name="person" size={20} color="#ffff" />
            </View>
          </View>

        </View>

        <View >
          {/* Performance Cards */}
          <View style={styles.performanceContainer}>
            {/* Tests Completed */}
            <View style={styles.performanceCard}>
              {/* performance card row section  */}
              <View style={styles.performanceRow}>
                <View style={styles.performanceIcon}>
                  <Icon name="checkmark" size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.performanceLabel} numberOfLines={2}>Test Completed</Text>
              </View>

              <Text style={styles.performanceNumber}>12</Text>

            </View>

            {/* Average Time Duration */}
            <View style={styles.performanceCard}>
              <View style={styles.performanceRow}>

                <View style={[styles.performanceIcon, { backgroundColor: '#F2F2F2' }]}>
                  <Icon name="time-outline" size={16} color="#376AED" />
                </View>
                <Text style={styles.performanceLabel}>Avg. Time Duration</Text>
              </View>


              <Text style={[styles.performanceNumber]}>1h 46m</Text>

            </View>
          </View>

          {/* Performance Analysis Link */}
          <TouchableOpacity style={styles.analysisLink}>
            <Text style={styles.analysisText}>Performance Analysis</Text>
          </TouchableOpacity>

          {/* Practice Tests Section */}
          <Text style={styles.sectionTitle}>Practice Tests</Text>
        </View>



        {/* Test SCroller section contains of test cards */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Test Cards */}
          <View style={styles.testsContainer}>
          {filteredQuestionPaper.map((test) => (
            <TestCard
              key={test._id}
              title={test.title}
              subject={test.subject}
              level={test.level}
              duration={test.estimatedDuration.toString()}
              status={test.status as 'completed' | 'available' | 'locked'}
              onPress={() => handleTestPress(test._id)}
            />
          ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: "10%",

  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingTop: 15,
    paddingBottom: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter',
  },
  notificationButton: {
    width: 32,
    height: 32,
    backgroundColor: '#339657',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: "-1%",
    right: "-1%",
    width: 5,
    height: 5,
    backgroundColor: '#FF6B2C',
    borderRadius: 2.5,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: "center",
    width: 40,
    borderColor: "#F7B500",
    borderWidth: 1,
    borderRadius: 9999,
    height: 40,
  },
  performanceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8, width: "100%", justifyContent: 'space-between', paddingBottom: "0.5%",
  },
  avatar: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderColor: '#F7B500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 20,
  },
  performanceContainer: {
    flexDirection: 'row',
    paddingHorizontal: 29,
    paddingTop: 30,
    gap: 8,
    width: "100%"
  },
  performanceCard: {

    backgroundColor: '#376AED',
    borderRadius: 16,
    paddingHorizontal: "3%",
    paddingVertical: "2%",
    width: "50%"

  },
  performanceIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#07E092',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',

  },
  performanceNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Rubik',


  },
  performanceLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    fontFamily: 'Poppins',
    width: "70%",



  },
  analysisLink: {
    alignItems: 'flex-end',
    paddingHorizontal: 29,
    paddingTop: 12,
  },
  analysisText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#0754AF',
    fontFamily: 'Inter',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#070417',
    fontFamily: 'Poppins',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 10,
  },
  testsContainer: {
    paddingHorizontal: 16,
    gap: 13,
    paddingBottom: 100,
  },
  testCard: {
    backgroundColor: '#F4F7FA',
    borderRadius: 12,
    padding: 20,
    minHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  cardLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  clipboardIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  subjectBadge: {
    backgroundColor: '#F1E2FF',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  subjectText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#8A2BE2',
    fontFamily: 'Rubik',
  },
  levelBadge: {
    backgroundColor: '#FEE8E8',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  levelBadge2: {
    backgroundColor: '#FFD4DA',
  },
  levelText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#FF6B6B',
    fontFamily: 'Rubik',
  },
  testTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter',
    lineHeight: 24,
  },
  cardRightContent: {
    alignItems: 'flex-end',
    gap: 8,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B6B6B',
    fontFamily: 'Poppins',
  },
  trophyIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#F0F8F0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    backgroundColor: '#339657',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

export default TestScreen; 