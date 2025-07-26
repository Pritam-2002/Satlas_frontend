import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create axios instance with base URL
const API_URL = "http://10.231.168.82:8000/api";


const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Utility functions for token management
export const tokenUtils = {
  // Get current token from storage
  getToken: async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Current token:', token ? 'Token exists' : 'No token');
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Set token manually (for debugging)
  setToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('token', token);
      console.log('Token set successfully');
    } catch (error) {
      console.error('Error setting token:', error);
    }
  },

  // Clear token
  clearToken: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token cleared');
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  }
};

// Request interceptor for adding token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Retrieved token from storage:', token ? 'Token exists' : 'No token found');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Added Authorization header:', `Bearer ${token.substring(0, 20)}...`);
      } else {
        console.log('No token available, proceeding without Authorization header');
      }
    } catch (error) {
      console.error('Error retrieving token from storage:', error);
    }

    console.log('Request config:', {
      method: config.method,
      url: config.url,
      headers: config.headers,
    });

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response success:', {
      status: response.status,
      url: response.config.url,
      method: response.config.method
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers
    });
    return Promise.reject(error);
  }
);

export default apiClient; 