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
  allQuestionDetails: Question[];
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

export interface QuestionPaper {
  _id: string;
  title: string;
  type: string;
  subject: string;
  level: string;
  status: string;
  estimatedDuration: number;
  questionsCount: number;
  questionsID: string[];
  createdAt: string;
  __v: number;
}

export interface QuestionPaperResponse {
  message: string;
  result: QuestionPaper[];
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

export interface TestSubmissionRequest {
  questionPaperId: string;
  timeTaken: number;
  userAnswers: Array<{
    questionId: string;
    answer: string;
  }>;
}

export const questionService = {
  // Get all questions for daily quiz
  getQuestions: async (questionId: string ): Promise<QuizResponse> => {
    try {
      console.log("questionId in getQuestions", questionId);
      const response = await apiClient.get(`/questions/getquestions?rawquestionIds=${questionId}`);
      console.log("response in getQuestions", response.data);
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
  },

  // Submit test answers
  submitTest: async (data: TestSubmissionRequest): Promise<MultipleAnswerValidationResponse> => {
    try {
      const token = await tokenUtils.getToken();
      const response = await apiClient.post('/questions/ValidateAnswer', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getQuestionPaper: async (): Promise<QuestionPaperResponse> => {
    try {
      const response = await apiClient.get('/questionpaper/getquestionpaper');
      console.log("questionPaper in quizService", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default questionService; 