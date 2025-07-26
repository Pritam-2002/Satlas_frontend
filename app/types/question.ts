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
}