import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface TestResultsRouteParams {
  results: Array<{
    questionId: string;
    isCorrect: boolean;
    explanation: string;
    VideoSolutionUrl: string;
    message: string;
  }>;
  totalQuestions: number;
  timeTaken: string;
  testTitle: string;
}

const TestResultsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { results, totalQuestions, timeTaken, testTitle } = route.params as TestResultsRouteParams;

  // Calculate statistics
  const correctAnswers = results.filter(result => result.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const expectedScore = Math.round((percentage / 100) * 1600); // SAT score calculation

  const CircularProgress = ({ percentage }: { percentage: number }) => {
    const strokeWidth = 35;
    const radius = 72.5;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <View style={styles.progressContainer}>
        <View style={styles.circularProgress}>
          {/* Background circle */}
          <View style={[styles.progressCircle, { borderColor: '#E1E6EE' }]} />

          {/* Progress circles - simplified representation */}
          <View style={[styles.progressCircle, {
            borderColor: '#FDB8D7',
            borderWidth: 15,
            transform: [{ rotate: '0deg' }]
          }]} />
          <View style={[styles.progressCircle, {
            borderColor: '#BFB7FD',
            borderWidth: 15,
            transform: [{ rotate: '45deg' }]
          }]} />
          <View style={[styles.progressCircle, {
            borderColor: '#FD6251',
            borderWidth: 25,
            transform: [{ rotate: '90deg' }]
          }]} />
        </View>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with gradient */}
      <LinearGradient
        colors={['#D3CDF9', '#FFFFFF']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#151521" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>{testTitle} - Report</Text>

        {/* Performance Matrix */}
        <Text style={styles.sectionTitle}>Performance Matrix</Text>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Correct Responses</Text>
            <Text style={styles.statValue}>{correctAnswers}/{totalQuestions}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Expected Avg. Score</Text>
            <Text style={[styles.statValue, { color: '#F88636' }]}>{expectedScore}</Text>
          </View>
        </View>

        {/* Circular Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>SAT Score Percentage</Text>
          <CircularProgress percentage={percentage} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Paper Grid & Solutions Card */}
        <TouchableOpacity style={styles.actionCard}>
          <View style={styles.actionCardContent}>
            <Text style={styles.actionCardTitle}>Paper Grid & Solutions</Text>
            <View style={styles.actionCardInfo}>
              <View style={styles.actionCardStats}>
                <Text style={styles.actionCardText}>{totalQuestions} Exercises</Text>
                <View style={styles.dot} />
              </View>
              <Text style={styles.actionCardText}>{timeTaken}</Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={16} color="#7C4DFF" />
        </TouchableOpacity>

        {/* Progress Section */}
        <View style={styles.progressCards}>
          <Text style={styles.progressTitle}>Progress</Text>

          {/* Progress Cards - placeholder data */}
          <View style={styles.progressCardContainer}>
            <View style={styles.progressCard}>
              <View style={styles.progressCircleSmall}>
                <View style={[styles.progressCircleInner, { width: 40, height: 40 }]} />
              </View>
              <View style={styles.progressCardText}>
                <Text style={styles.progressCardTitle}>Reading Section</Text>
                <Text style={styles.progressCardSubtitle}>15 min remaining</Text>
              </View>
              <Text style={styles.progressCardScore}>5/12</Text>
            </View>

            <View style={styles.progressCard}>
              <View style={styles.progressCircleSmall}>
                <View style={[styles.progressCircleInner, { width: 40, height: 40 }]} />
              </View>
              <View style={styles.progressCardText}>
                <Text style={styles.progressCardTitle}>Math Section</Text>
                <Text style={styles.progressCardSubtitle}>23 min remaining</Text>
              </View>
              <Text style={styles.progressCardScore}>3/20</Text>
            </View>
          </View>
        </View>

        {/* Other Statistics */}
        <View style={styles.otherStats}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsHeaderTitle}>Other Statistics</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>

          <View style={styles.statItemsContainer}>
            {/* Time Taken */}
            <View style={styles.statItem}>
              <View style={styles.statItemContent}>
                <View style={styles.statIconContainer}>
                  <Icon name="time-outline" size={18} color="#FFFFFF" />
                </View>
                <View style={styles.statItemText}>
                  <Text style={styles.statItemTitle}>Time Taken</Text>
                  <Text style={styles.statItemSubtitle}>Students Avg. 00:58:43</Text>
                </View>
              </View>
              <Text style={styles.statItemValue}>{timeTaken}</Text>
            </View>

            {/* English Section */}
            <View style={styles.statItem}>
              <View style={styles.statItemContent}>
                <View style={styles.statIconContainer}>
                  <Icon name="book-outline" size={18} color="#FFFFFF" />
                </View>
                <View style={styles.statItemText}>
                  <Text style={styles.statItemTitle}>English Section</Text>
                  <Text style={styles.statItemSubtitle}>Students Avg. 23/32</Text>
                </View>
              </View>
              <Text style={styles.statItemValue}>19/32 Q's</Text>
            </View>

            {/* Math Section */}
            <View style={styles.statItem}>
              <View style={styles.statItemContent}>
                <View style={styles.statIconContainer}>
                  <Icon name="calculator-outline" size={18} color="#FFFFFF" />
                </View>
                <View style={styles.statItemText}>
                  <Text style={styles.statItemTitle}>Math Section</Text>
                  <Text style={styles.statItemSubtitle}>Students Avg. 23/32</Text>
                </View>
              </View>
              <Text style={styles.statItemValue}>19/32 Q's</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerGradient: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#151521',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Plus Jakarta Sans',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '500',
    color: '#151521',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Plus Jakarta Sans',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 27,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#E9E6F7',
    borderRadius: 32,
    padding: 16,
    alignItems: 'center',
    width: 163,
    height: 88,
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#23236F',
    textAlign: 'center',
    marginBottom: 10,
    opacity: 0.83,
    fontFamily: 'Plus Jakarta Sans',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Plus Jakarta Sans',
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#23236F',
    opacity: 0.83,
    marginBottom: 20,
    fontFamily: 'Plus Jakarta Sans',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circularProgress: {
    width: 180,
    height: 180,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    width: 145,
    height: 145,
    borderRadius: 72.5,
    borderWidth: 35,
    position: 'absolute',
  },
  percentageText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#151521',
    position: 'absolute',
    fontFamily: 'Urbanist',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  actionCard: {
    backgroundColor: '#F3F6FB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  actionCardContent: {
    flex: 1,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E22',
    marginBottom: 4,
    fontFamily: 'Overpass',
  },
  actionCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionCardStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionCardText: {
    fontSize: 14,
    color: '#9C9BC2',
    fontFamily: 'Overpass',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9C9BC2',
  },
  progressCards: {
    marginBottom: 30,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#363636',
    marginBottom: 20,
    fontFamily: 'Overpass',
  },
  progressCardContainer: {
    gap: 12,
  },
  progressCard: {
    backgroundColor: '#F3F6FB',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  progressCircleSmall: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E1E6EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleInner: {
    borderRadius: 20,
    backgroundColor: '#7C4DFF',
  },
  progressCardText: {
    flex: 1,
    gap: 4,
  },
  progressCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1E22',
    fontFamily: 'Overpass',
  },
  progressCardSubtitle: {
    fontSize: 12,
    color: '#9C9BC2',
    fontFamily: 'Overpass',
  },
  progressCardScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7C4DFF',
    fontFamily: 'Overpass',
  },
  otherStats: {
    marginBottom: 50,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statsHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Plus Jakarta Sans',
  },
  seeAll: {
    fontSize: 12,
    color: '#000000',
    opacity: 0.5,
    fontFamily: 'Plus Jakarta Sans',
  },
  statItemsContainer: {
    gap: 12,
  },
  statItem: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#151521',
    borderRadius: 32,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    opacity: 0.2,
  },
  statItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#151521',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statItemText: {
    gap: 5,
  },
  statItemTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#151521',
    fontFamily: 'Plus Jakarta Sans',
  },
  statItemSubtitle: {
    fontSize: 12,
    color: '#1A1D25',
    opacity: 0.5,
    fontFamily: 'Plus Jakarta Sans',
  },
  statItemValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Plus Jakarta Sans',
  },
});

export default TestResultsScreen; 