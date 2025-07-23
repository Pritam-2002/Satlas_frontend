import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { questionService, Question, AnswerValidationResponse } from '../../services/quizService';

const { width } = Dimensions.get('window');

const DailyQuizScreen: React.FC = () => {
  const navigation = useNavigation();
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [solution, setSolution] = useState<AnswerValidationResponse | null>(null);
  const [playing, setPlaying] = useState(false);

  // Load questions on component mount
  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    try {
      setLoading(true);
      const response = await questionService.getQuestions('quiz');
      // Get the first question since it's a single question quiz
      if (response.questions && response.questions.length > 0) {
        setQuestion(response.questions[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load question. Please try again.');
      console.error('Failed to load question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (!submitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      Alert.alert('Please select an answer', 'You must select an answer before submitting.');
      return;
    }

    if (!question) {
      Alert.alert('Error', 'No question available.');
      return;
    }

    try {
      setSubmitting(true);
      const validation = await questionService.validateAnswer(question._id, selectedAnswer);
      setSolution(validation);
      setSubmitted(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit answer. Please try again.');
      console.error('Failed to submit answer:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Removed handleTryAgain function as it's no longer needed

  const extractYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7D7FFA" />
        <Text style={styles.loadingText}>Loading question...</Text>
      </View>
    );
  }

  if (!question) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No question available</Text>
        <Pressable style={styles.retryButton} onPress={loadQuestion}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.gradientHeader}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#FFF" />
          </Pressable>
          <Text style={styles.title}>Daily Quiz</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Simple Navigation */}

      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question Section */}
        <View style={styles.section}>
          <Text style={styles.questionText}>
            <Text style={styles.questionLabel}>Question: </Text>
            {question.question}
          </Text>

          {/* Answer Options */}
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => {
              const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
              const isSelected = selectedAnswer === option;

              let circleStyles = [styles.optionCircle];
              let textStyles = [styles.optionText];

              if (submitted && solution) {
                if (option === selectedAnswer) {
                  // Show if user's answer was correct or incorrect
                  if (solution.isCorrect) {
                    circleStyles.push(styles.correctOption);
                    textStyles.push(styles.correctText);
                  } else {
                    circleStyles.push(styles.incorrectOption);
                    textStyles.push(styles.incorrectText);
                  }
                } else if (option === solution.correctAnswer) {
                  // Always show the correct answer
                  circleStyles.push(styles.correctOption);
                  textStyles.push(styles.correctText);
                }
              } else if (isSelected) {
                circleStyles.push(styles.selectedOptionCircle);
              }

              return (
                <Pressable
                  key={index}
                  style={styles.optionContainer}
                  onPress={() => handleAnswerSelect(option)}
                  disabled={submitted}
                >
                  <View style={circleStyles}>
                    {(isSelected || (submitted && option === selectedAnswer)) &&
                      <View style={styles.selectedDot} />
                    }
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={textStyles}>
                      {optionLabel}. {option}
                    </Text>
                    {submitted && solution && option === solution.correctAnswer && (
                      <View style={styles.correctAnswerBadge}>
                        <Text style={styles.correctAnswerText}>Correct Answer</Text>
                      </View>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Solution Section */}
        {submitted && solution && (
          <View style={styles.solutionSection}>
            <View style={[styles.resultBanner, solution.isCorrect ? styles.correctBanner : styles.incorrectBanner]}>
              <Icon
                name={solution.isCorrect ? "check-circle" : "close-circle"}
                size={24}
                color="#FFF"
              />
              <Text style={styles.resultText}>
                {solution.isCorrect ? "Correct!" : "Incorrect!"}
              </Text>
            </View>

            <Text style={styles.messageText}>
              {!solution.isCorrect && (
                <>
                  {"\n"}The correct answer was: <Text style={styles.correctAnswerInMessage}>
                    {String.fromCharCode(65 + question.options.findIndex(opt => opt === solution.correctAnswer))}. {solution.correctAnswer}
                  </Text>
                </>
              )}
            </Text>

            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>Explanation:</Text>
              <Text style={styles.explanationText}>{solution.explanation}</Text>
            </View>

            {/* YouTube Video Solution */}
            {solution.VideoSolutionUrl && (
              <View style={styles.videoContainer}>
                <Text style={styles.videoTitle}>Video Solution:</Text>
                <View style={styles.videoPlayerContainer}>
                  <YoutubePlayer
                    height={200}
                    width={width - 52}
                    play={playing}
                    videoId={extractYouTubeVideoId(solution.VideoSolutionUrl)}
                    onChangeState={(state) => {
                      if (state === 'ended') {
                        setPlaying(false);
                      }
                    }}
                  />
                </View>

              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Button */}
      {!submitted && (
        <View style={styles.bottomNav}>
          <Pressable
            style={[styles.actionButton, styles.submitButton]}
            onPress={handleSubmit}
            disabled={submitting || !selectedAnswer}
          >
            {submitting ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.actionButtonText}>Submit Answer</Text>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#7D7FFA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  gradientHeader: {
    backgroundColor: '#7D7FFA',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingTop: 35,
    paddingBottom: 15,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    flex: 1,

  },
  headerSpacer: {
    width: 36,
  },
  tabsContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  questionsTab: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2C2C2C',
    marginBottom: 30,
    fontWeight: '500',
  },
  questionLabel: {
    color: '#F04848',
    fontWeight: '600',
  },
  optionsContainer: {
    gap: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  selectedOptionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#7D7FFA',
    backgroundColor: '#7D7FFA',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    marginTop: 2,
  },
  correctOption: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#10B981',
    backgroundColor: '#10B981',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    marginTop: 2,
  },
  incorrectOption: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EF4444',
    backgroundColor: '#EF4444',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    marginTop: 2,
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
  optionTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  optionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
    flex: 1,
  },
  correctAnswerBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  correctAnswerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  correctAnswerInMessage: {
    color: '#10B981',
    fontWeight: '600',
  },
  correctText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#10B981',
    flex: 1,
    fontWeight: '600' as '600',
  },
  incorrectText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#EF4444',
    flex: 1,
    fontWeight: '600' as '600',
  },
  solutionSection: {
    marginTop: 30,
    paddingBottom: 100,
  },
  resultBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,

    gap: 12,
  },
  correctBanner: {
    backgroundColor: '#10B981',
  },
  incorrectBanner: {
    backgroundColor: '#EF4444',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  messageText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',

    fontWeight: '500',
  },
  explanationContainer: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
  videoContainer: {
    marginTop: 10,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  videoPlayerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    paddingHorizontal: 26,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#7D7FFA',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});

export default DailyQuizScreen; 