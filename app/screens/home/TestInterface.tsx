import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  AppState,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { quizService } from '../../services/quizService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomestackNavigator';
import PaperGrid from '../../components/PaperGrid';
import { tokenUtils } from '../../utils/apiClient';

const TOTAL_TIME = 90 * 60; // 90 minutes in seconds
const TEST_STATE_KEY = 'testState';

const TestInterface = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_TIME);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [activeTab, setActiveTab] = useState('questions');
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [visitedQuestions, setVisitedQuestions] = useState<number[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [testStartTime, setTestStartTime] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveTimeRef = useRef<number>(Date.now());

  // Initialize test when component mounts
  useEffect(() => {
    initializeTest();

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (isInitialized) {
        saveCurrentState();
      }
    };
  }, []);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    if (!isInitialized) return;

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        saveCurrentState();
      } else if (nextAppState === 'active') {
        // Recalculate time when app comes back to foreground
        loadSavedState();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isInitialized]);

  // Timer logic - runs every second
  useEffect(() => {
    if (isTimerActive && timeRemaining > 0 && isInitialized) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          lastSaveTimeRef.current = Date.now();

          if (newTime <= 0) {
            setIsTimerActive(false);
            handleTimeUp();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimerActive, timeRemaining, isInitialized]);

  // Auto-save every 5 seconds
  useEffect(() => {
    if (!isInitialized) return;

    const autoSaveInterval = setInterval(() => {
      saveCurrentState();
    }, 5000);

    return () => clearInterval(autoSaveInterval);
  }, [isInitialized, timeRemaining, currentQuestionIndex, answeredQuestions, visitedQuestions, userAnswers]);

  const initializeTest = async () => {
    try {
      // First load questions
      const response = await quizService.getQuestions('practice_paper');
      if (response.questions) {
        setQuestions(response.questions);

        // Then load saved state
        await loadSavedState();
      }
    } catch (error) {
      console.error('Error initializing test:', error);
      Alert.alert('Error', 'Failed to initialize test');
    } finally {
      setIsInitialized(true);
    }
  };

  const loadSavedState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(TEST_STATE_KEY);

      if (savedState) {
        const {
          timeRemaining: savedTime,
          currentQuestionIndex: savedIndex,
          answeredQuestions: savedAnswered,
          visitedQuestions: savedVisited,
          userAnswers: savedUserAnswers,
          testStartTime: savedStartTime,
          lastSaveTime
        } = JSON.parse(savedState);

        console.log('Loading saved state:', {
          savedTime,
          savedIndex,
          savedStartTime,
          lastSaveTime,
          currentTime: Date.now()
        });

        // Calculate elapsed time since last save
        const elapsedSeconds = Math.floor((Date.now() - lastSaveTime) / 1000);
        const remainingTime = Math.max(0, savedTime - elapsedSeconds);

        console.log('Calculated remaining time:', remainingTime);

        setTimeRemaining(remainingTime);
        setCurrentQuestionIndex(savedIndex || 0);
        setAnsweredQuestions(savedAnswered || []);
        setVisitedQuestions(savedVisited || []);
        setUserAnswers(savedUserAnswers || {});
        setTestStartTime(savedStartTime || Date.now());

        // Set selected answer for current question
        if (savedUserAnswers && savedUserAnswers[savedIndex || 0]) {
          setSelectedAnswer(savedUserAnswers[savedIndex || 0]);
        }

        // Only start timer if there's time remaining
        if (remainingTime > 0) {
          setIsTimerActive(true);
          lastSaveTimeRef.current = Date.now();
        } else {
          setIsTimerActive(false);
          handleTimeUp();
        }
      } else {
        // Start fresh test
        console.log('Starting fresh test');
        const startTime = Date.now();
        setTimeRemaining(TOTAL_TIME);
        setTestStartTime(startTime);
        setIsTimerActive(true);
        setVisitedQuestions([0]); // Mark first question as visited
        lastSaveTimeRef.current = startTime;
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
      // Fallback to fresh start
      const startTime = Date.now();
      setTimeRemaining(TOTAL_TIME);
      setTestStartTime(startTime);
      setIsTimerActive(true);
      setVisitedQuestions([0]);
      lastSaveTimeRef.current = startTime;
    }
  };

  const saveCurrentState = async () => {
    if (!isInitialized) return;

    try {
      const state = {
        timeRemaining,
        currentQuestionIndex,
        answeredQuestions,
        visitedQuestions,
        userAnswers,
        testStartTime,
        lastSaveTime: Date.now(),
      };

      console.log('Saving state:', state);
      await AsyncStorage.setItem(TEST_STATE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUp = () => {
    setIsTimerActive(false);
    Alert.alert(
      'Time Up!',
      'Your test time has expired. Please submit your answers.',
      [{ text: 'OK', onPress: handleSubmitTest }]
    );
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);

    // Convert letter (A, B, C, D) to option index and get actual option text
    const optionIndex = answerId.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
    const actualOptionText = currentQuestion.options[optionIndex];

    // Update user answers with actual option text
    const newUserAnswers = { ...userAnswers, [currentQuestionIndex]: actualOptionText };
    setUserAnswers(newUserAnswers);

    // Update answered questions
    if (!answeredQuestions.includes(currentQuestionIndex)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
    }
  };

  const handleQuestionSelect = (questionIndex: number) => {
    // Save current answer before switching
    if (selectedAnswer) {
      const optionIndex = selectedAnswer.charCodeAt(0) - 65;
      const actualOptionText = currentQuestion.options[optionIndex];
      const newUserAnswers = { ...userAnswers, [currentQuestionIndex]: actualOptionText };
      setUserAnswers(newUserAnswers);

      if (!answeredQuestions.includes(currentQuestionIndex)) {
        setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
      }
    }

    // Mark new question as visited
    if (!visitedQuestions.includes(questionIndex)) {
      setVisitedQuestions([...visitedQuestions, questionIndex]);
    }

    setCurrentQuestionIndex(questionIndex);

    // Convert stored option text back to letter for UI display
    const storedOptionText = userAnswers[questionIndex];
    if (storedOptionText) {
      const newQuestion = questions[questionIndex];
      const optionIndex = newQuestion.options.findIndex((option: string) => option === storedOptionText);
      if (optionIndex !== -1) {
        setSelectedAnswer(String.fromCharCode(65 + optionIndex)); // Convert back to A, B, C, D
      } else {
        setSelectedAnswer(null);
      }
    } else {
      setSelectedAnswer(null);
    }

    setActiveTab('questions'); // Switch back to questions tab
  };

  const handleSubmitTest = async () => {
    Alert.alert(
      'Submit Test',
      'Are you sure you want to submit your test?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Submit',
          onPress: async () => {
            try {
              setIsTimerActive(false);
              if (timerRef.current) {
                clearInterval(timerRef.current);
              }

              // Debug: Check if token exists before submitting
              const currentToken = await tokenUtils.getToken();
              if (!currentToken) {
                Alert.alert(
                  'Authentication Error',
                  'No authentication token found. Please login again.',
                  [{ text: 'OK' }]
                );
                return;
              }
              console.log('Token available for submission:', currentToken ? 'Yes' : 'No');

              // Format answers for submission
              const formattedAnswers = Object.entries(userAnswers).map(([index, optionText]) => {
                const questionIndex = parseInt(index);
                const question = questions[questionIndex];
                return {
                  questionId: question._id, // Use the _id from the question
                  answer: optionText // Send the actual option text (like "rat", "Delhi")
                };
              });

              console.log('Submitting answers:', formattedAnswers);

              // Submit answers to validate endpoint
              const response = await quizService.validateAnswers({
                userAnswers: formattedAnswers
              });

              console.log('Validation response:', response);

              // Calculate test completion time
              const testEndTime = Date.now();
              const totalTestTime = testStartTime ? testEndTime - testStartTime : 0;
              const timeTakenFormatted = formatTime(Math.floor(totalTestTime / 1000));

              // Clear saved state
              await AsyncStorage.removeItem(TEST_STATE_KEY);

              // Show success modal first
              Alert.alert(
                'Test Submission Successful',
                `Review your test score on next screen.\n\nCorrect: ${response.results.filter(r => r.isCorrect).length}\nAttempted: ${response.results.length}`,
                [
                  {
                    text: 'VIEW RESULT',
                    onPress: () => {
                      // Navigate to results screen with data
                      navigation.navigate('TestResults', {
                        results: response.results,
                        totalQuestions: questions.length,
                        timeTaken: timeTakenFormatted,
                        testTitle: 'SAT Practice Test 1'
                      });
                    }
                  }
                ]
              );
            } catch (error: any) {
              console.error('Error submitting test:', error);

              // More detailed error handling
              if (error.response?.status === 401) {
                Alert.alert(
                  'Authentication Error',
                  'Your session has expired. Please login again.',
                  [{ text: 'OK' }]
                );
              } else {
                Alert.alert(
                  'Error',
                  `Failed to submit test: ${error.response?.data?.error || error.message}`,
                  [{ text: 'OK' }]
                );
              }
            }
          }
        }
      ]
    );
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Save current answer before moving
      if (selectedAnswer) {
        const optionIndex = selectedAnswer.charCodeAt(0) - 65;
        const actualOptionText = currentQuestion.options[optionIndex];
        const newUserAnswers = { ...userAnswers, [currentQuestionIndex]: actualOptionText };
        setUserAnswers(newUserAnswers);

        if (!answeredQuestions.includes(currentQuestionIndex)) {
          setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
        }
      }

      const nextIndex = currentQuestionIndex + 1;

      // Mark next question as visited
      if (!visitedQuestions.includes(nextIndex)) {
        setVisitedQuestions([...visitedQuestions, nextIndex]);
      }

      setCurrentQuestionIndex(nextIndex);

      // Convert stored option text back to letter for UI display
      const storedOptionText = userAnswers[nextIndex];
      if (storedOptionText) {
        const nextQuestion = questions[nextIndex];
        const optionIndex = nextQuestion.options.findIndex((option: string) => option === storedOptionText);
        if (optionIndex !== -1) {
          setSelectedAnswer(String.fromCharCode(65 + optionIndex));
        } else {
          setSelectedAnswer(null);
        }
      } else {
        setSelectedAnswer(null);
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Save current answer before moving
      if (selectedAnswer) {
        const optionIndex = selectedAnswer.charCodeAt(0) - 65;
        const actualOptionText = currentQuestion.options[optionIndex];
        const newUserAnswers = { ...userAnswers, [currentQuestionIndex]: actualOptionText };
        setUserAnswers(newUserAnswers);

        if (!answeredQuestions.includes(currentQuestionIndex)) {
          setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
        }
      }

      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);

      // Convert stored option text back to letter for UI display
      const storedOptionText = userAnswers[prevIndex];
      if (storedOptionText) {
        const prevQuestion = questions[prevIndex];
        const optionIndex = prevQuestion.options.findIndex((option: string) => option === storedOptionText);
        if (optionIndex !== -1) {
          setSelectedAnswer(String.fromCharCode(65 + optionIndex));
        } else {
          setSelectedAnswer(null);
        }
      } else {
        setSelectedAnswer(null);
      }
    }
  };

  const renderContent = () => {
    if (activeTab === 'grid') {
      return (
        <PaperGrid
          totalQuestions={questions.length}
          currentQuestion={currentQuestionIndex}
          answeredQuestions={answeredQuestions}
          visitedQuestions={visitedQuestions}
          onQuestionSelect={handleQuestionSelect}
        />
      );
    }

    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question Label */}
        <View style={styles.labelContainer}>
          <Text style={styles.questionLabel}>Question:</Text>
          <Text style={styles.questionCounter}>
            {currentQuestionIndex + 1} of {questions.length} Questions
          </Text>
        </View>

        {currentQuestion && (
          <>
            {/* Question */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
            </View>

            {/* Question Image if exists */}
            {currentQuestion.questionImage && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: currentQuestion.questionImage }}
                  style={styles.questionImage}
                  resizeMode="contain"
                />
              </View>
            )}

            {/* Answer Options */}
            <View style={styles.answersContainer}>
              {currentQuestion.options.map((option: string, index: number) => {
                const optionId = String.fromCharCode(65 + index);
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.answerOption}
                    onPress={() => handleAnswerSelect(optionId)}
                  >
                    <View style={styles.answerRow}>
                      <View style={[
                        styles.radioButton,
                        selectedAnswer === optionId && styles.radioButtonSelected
                      ]}>
                        {selectedAnswer === optionId && (
                          <View style={styles.radioButtonInner} />
                        )}
                      </View>
                      <Text style={styles.answerText}>
                        {optionId}. {option}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    );
  };

  return (
    <LinearGradient colors={['#7D7FFA', '#6365FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={async () => {
              await saveCurrentState();
              navigation.goBack();
            }}
          >
            <Icon name="menu" size={20} color="#000000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>SAT Practice Test 1</Text>

          {/* Timer */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
          </View>
        </View>

        {/* Test Info Bar */}
        <View style={styles.testInfoBar}>
          <View style={styles.testInfoLeft}>
            <Icon name="time-outline" size={14} color="#FFFFFF" />
            <Text style={styles.testInfoText}>1h 30min</Text>
            <Text style={styles.testInfoText}>{questions.length} questions</Text>
          </View>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('passage')}
          >
            <Text style={[styles.tabText, activeTab === 'passage' && styles.tabTextActive]}>
              Passage
            </Text>
            {activeTab === 'passage' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('questions')}
          >
            <Text style={[styles.tabText, activeTab === 'questions' && styles.tabTextActive]}>
              Questions
            </Text>
            {activeTab === 'questions' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('grid')}
          >
            <Text style={[styles.tabText, activeTab === 'grid' && styles.tabTextActive]}>
              Paper Grid
            </Text>
            {activeTab === 'grid' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Content */}
        {renderContent()}

        {/* Bottom Navigation */}
        <View style={styles.bottomNavigation}>
          <View style={styles.navButtonsContainer}>
            <TouchableOpacity
              style={[styles.navButton, currentQuestionIndex === 0 && styles.navButtonDisabled]}
              onPress={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <Text style={styles.navButtonText}>PREV</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navButton, currentQuestionIndex === questions.length - 1 && styles.navButtonDisabled]}
              onPress={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              <Text style={styles.navButtonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitTest}
          >
            <Text style={styles.submitButtonText}>SUBMIT TEST</Text>
          </TouchableOpacity>
        </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingTop: 15,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: -100,
    fontFamily: 'Inter',
  },
  timerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 9,

    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  timerText: {
    fontSize: 15,
    fontWeight: '500',

    color: '#FF5252',
    fontFamily: 'Poppins',
  },
  testInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingVertical: 10,

    marginLeft: 25
  },
  testInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  testInfoText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
  },
  questionCounter: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1E1E1E',
    fontFamily: 'Roboto',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'center',
    gap: 30,
  },
  tab: {
    paddingVertical: 8,
    position: 'relative',
    minWidth: 100,
    alignItems: 'center',
  },
  tabActive: {
    // Active tab styling handled by text color

  },
  tabText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    opacity: 0.9,
  },
  tabTextActive: {
    fontWeight: '600',
    opacity: 1,
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#01AF70',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',


  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingTop: 16,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F04848',
    fontFamily: 'Poppins',
  },
  responseLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#13855C',
    fontFamily: 'Poppins',
  },
  passageContainer: {
    paddingHorizontal: 26,
    paddingVertical: 12,
  },
  passageText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#383838',
    fontFamily: 'Inter',
    lineHeight: 22,
  },
  questionContainer: {
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  questionText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#2C2C2C',
    fontFamily: 'Roboto',
    lineHeight: 18,
  },
  answersContainer: {
    paddingHorizontal: 26,
    paddingTop: 20,
    paddingBottom: 100,
  },
  answerOption: {
    marginBottom: 13,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: '#2D2D2D',
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioButtonSelected: {
    borderColor: '#01AF70',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#01AF70',
  },
  answerText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Inter',
    flex: 1,
    lineHeight: 16.5,
  },
  bottomNavigation: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#5A81FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#3BD982',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  imageContainer: {
    paddingHorizontal: 26,
    paddingVertical: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  navButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#5A81FF',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
});

export default TestInterface; 