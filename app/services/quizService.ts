import apiClient from '../utils/apiClient';
import { tokenUtils } from '../utils/apiClient';

export interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  passage?: string;
  subject?: string;
  difficulty?: string;
  timeLimit?: number;
}

export interface QuizResponse {
  questions: Question[];
  totalQuestions: number;
}

export interface AnswerValidationRequest {
  userAnswer: string;
}

export interface MultipleAnswerValidationRequest {
  userAnswers: Array<{
    questionId: string;
    answer: string;
  }>;
}

export interface AnswerValidationResponse {
  questionId: string;
  isCorrect: boolean;
  explanation: string;
  VideoSolutionUrl: string;
  message: string;
  correctAnswer: string;
}

export interface MultipleAnswerValidationResponse {
  results: AnswerValidationResponse[];
}

export const questionService = {
  // Get all questions for daily quiz
  getQuestions: async (type: string = 'quiz'): Promise<QuizResponse> => {
    try {
      const response = await apiClient.get(`/questions/getquestions?type=${type}`);
      console.log(response.data);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Validate user answer for a specific question
  validateAnswer: async (questionId: string, userAnswer: string): Promise<AnswerValidationResponse> => {
    try {
      // Format data to match backend expectations (array with single question)
      const response = await apiClient.post('/questions/validateanswer', {
        userAnswers: [{
          questionId: questionId,
          answer: userAnswer
        }]
      });

      // Return the first result from the array
      return response.data.results[0];
    } catch (error) {
      throw error;
    }
  },

  // Validate multiple answers
  validateAnswers: async (data: MultipleAnswerValidationRequest): Promise<MultipleAnswerValidationResponse> => {
    try {
      // The authentication token will be automatically added by the axios interceptor
      const response = await apiClient.post('/questions/validateanswer', data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default questionService; 