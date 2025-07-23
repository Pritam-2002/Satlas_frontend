import apiClient from '../utils/apiClient';

export interface RegistrationData {
  _id: string;
  title: string;
  content: string;
  videoEmbedLink: string;
  registrationStart: {
    value: string;
    note: string;
  };
  registrationEnd: {
    value: string;
    note: string;
  };
  registrationLink: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationResponse {
  message: string;
  registrations: RegistrationData[];
}

export const registrationService = {
  // Get all registrations
  getRegistrations: async (): Promise<RegistrationResponse> => {
    try {
      const response = await apiClient.get('/getregistrations');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default registrationService; 