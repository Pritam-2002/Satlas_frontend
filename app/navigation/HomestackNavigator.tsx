import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SatLibaryPage from '../screens/home/SatLibaryPage';
import BookDemoScreen from 'app/screens/home/BookDemoPage';
import ComingSoonScreen from 'app/screens/home/CominSoonPage';
import ExamDateTable from 'app/screens/home/ExamDatesPage';
import RegistrationScreen from 'app/screens/home/RegistrationScreen';
import DailyQuizScreen from 'app/screens/home/DailyQuizScreen';
import Scholarships from 'app/screens/home/ScholarshipPage';
import TestScreen from '../screens/Testscreen';
import TestInterface from 'app/screens/home/TestInterface';
import TestResultsScreen from 'app/screens/home/TestResultsScreen';

export type HomeStackParamList = {
  HomeScreen: undefined;
  SatLibaryPage: undefined;
  BookDemoPage: undefined;
  ComingSoonPage: undefined;
  ExamDatePage: undefined;
  RegistrationScreen: undefined;
  DailyQuiz: undefined;
  Scholarships: undefined;
  Test: undefined;
  TestInterface: {
    joinedQuestionId: string;
    questionPaperId: string;
  };
  TestResults: {
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
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SatLibaryPage" component={SatLibaryPage} />
      <Stack.Screen name="BookDemoPage" component={BookDemoScreen} />
      <Stack.Screen name="ComingSoonPage" component={ComingSoonScreen} />
      <Stack.Screen name="ExamDatePage" component={ExamDateTable} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen name="DailyQuiz" component={DailyQuizScreen} />
      <Stack.Screen name="Scholarships" component={Scholarships} />
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="TestInterface" component={TestInterface} />
      <Stack.Screen name="TestResults" component={TestResultsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
