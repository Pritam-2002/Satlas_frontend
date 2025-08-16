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
import TestCard from '../components/common/TestCard';



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
          {filteredQuestionPaper.map((test, index) => (
            <TestCard
              key={test._id}
              title={`SAT Practice Test ${index + 1}`}
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

});

export default TestScreen;