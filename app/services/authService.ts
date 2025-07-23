import apiClient from '../utils/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserInfo {
  name: string;
  email: string;
  currentGrade: string;
  country: string;
}

interface AuthData {
  email: string;
  password: string;
}

interface SignupData extends UserInfo {
  password: string;
}

interface AuthResponse {
  user: UserInfo;
  token: string;
  message: string;
}

export const authService = {
  // Login user
  login: async (data: AuthData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/signin', data);

      // Store token and user data
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register new user
  signup: async (data: SignupData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/signup', data);

      // Store token and user data
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      throw error;
    }
  },

  // Check if user is logged in
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem('token');
      return !!token;
    } catch (error) {
      return false;
    }
  },

  // Get current user info
  getCurrentUser: async (): Promise<UserInfo | null> => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (!userJson) return null;

      return JSON.parse(userJson);
    } catch (error) {
      return null;
    }
  }
};

export default authService; 