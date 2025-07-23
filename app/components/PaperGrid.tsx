import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface PaperGridProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: number[];
  visitedQuestions: number[];
  onQuestionSelect: (questionIndex: number) => void;
}

const PaperGrid: React.FC<PaperGridProps> = ({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  visitedQuestions,
  onQuestionSelect,
}) => {
  const getQuestionStatus = (questionNumber: number) => {
    const questionIndex = questionNumber - 1;

    if (questionIndex === currentQuestion) {
      return 'current';
    } else if (answeredQuestions.includes(questionIndex)) {
      return 'answered';
    } else if (visitedQuestions.includes(questionIndex)) {
      return 'skipped';
    } else {
      return 'unanswered';
    }
  };

  const getQuestionStyle = (status: string) => {
    switch (status) {
      case 'current':
        return [styles.questionButton, styles.currentQuestion];
      case 'answered':
        return [styles.questionButton, styles.answeredQuestion];
      case 'skipped':
        return [styles.questionButton, styles.skippedQuestion];
      default:
        return [styles.questionButton, styles.unansweredQuestion];
    }
  };

  const getTextStyle = (status: string) => {
    switch (status) {
      case 'current':
        return [styles.questionText, styles.currentQuestionText];
      case 'answered':
        return [styles.questionText, styles.answeredQuestionText];
      case 'skipped':
        return [styles.questionText, styles.skippedQuestionText];
      default:
        return [styles.questionText, styles.unansweredQuestionText];
    }
  };

  const renderQuestionGrid = () => {
    const questions = [];
    const questionsPerRow = 8;

    for (let i = 1; i <= totalQuestions; i++) {
      const status = getQuestionStatus(i);

      questions.push(
        <TouchableOpacity
          key={i}
          style={getQuestionStyle(status)}
          onPress={() => onQuestionSelect(i - 1)}
        >
          <Text style={getTextStyle(status)}>{i}</Text>
        </TouchableOpacity>
      );
    }

    // Group questions into rows
    const rows = [];
    for (let i = 0; i < questions.length; i += questionsPerRow) {
      const row = questions.slice(i, i + questionsPerRow);
      rows.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }

    return rows;
  };

  const getStatusCounts = () => {
    const answered = answeredQuestions.length;
    const skipped = visitedQuestions.filter(q => !answeredQuestions.includes(q)).length;
    const unanswered = totalQuestions - visitedQuestions.length;

    return { answered, skipped, unanswered };
  };

  const { answered, skipped, unanswered } = getStatusCounts();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Paper Grid:</Text>
        <Text style={styles.subtitle}>{currentQuestion + 1} of {totalQuestions} Questions</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{answered}</Text>
          <Text style={styles.statLabel}>Answered</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{skipped}</Text>
          <Text style={styles.statLabel}>Skipped</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{unanswered}</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.currentQuestion]} />
          <Text style={styles.legendText}>Current</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.answeredQuestion]} />
          <Text style={styles.legendText}>Answered</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.skippedQuestion]} />
          <Text style={styles.legendText}>Skipped</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.unansweredQuestion]} />
          <Text style={styles.legendText}>Unanswered</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {renderQuestionGrid()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    fontFamily: 'Roboto',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
    fontFamily: 'Roboto',
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  legendItem: {
    alignItems: 'center',
    gap: 4,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendText: {
    fontSize: 10,
    fontWeight: '400',
    color: '#666666',
    fontFamily: 'Roboto',
  },
  grid: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  questionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',

  },
  questionText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  // Current question (blue)
  currentQuestion: {
    backgroundColor: '#5A81FF',
    borderColor: '#5A81FF',
  },
  currentQuestionText: {
    color: '#FFFFFF',
  },
  // Answered questions (green)
  answeredQuestion: {
    backgroundColor: '#B6FFBB',

  },
  answeredQuestionText: {
    color: '#000000',
  },
  // Skipped questions (yellow)
  skippedQuestion: {
    backgroundColor: '#FFEDA3',
    borderColor: '#FFC107',
  },
  skippedQuestionText: {
    color: '#000000',
  },
  // Unanswered questions (light gray)
  unansweredQuestion: {
    backgroundColor: '#F5F5F5',
    borderColor: '#DDDDDD',
  },
  unansweredQuestionText: {
    color: '#666666',
  },
});

export default PaperGrid; 