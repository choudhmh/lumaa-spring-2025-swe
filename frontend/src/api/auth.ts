import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3000/auth/register'; // Ensure this is correct

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(API_URL, { name, email, password });
    return response.data;
  } catch (error: unknown) {
    console.error('❌ Registration API error:', error);

    if (error instanceof AxiosError) {
      // Axios-specific error handling
      throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
    } else if (error instanceof Error) {
      // General JavaScript error
      throw new Error(error.message);
    } else {
      // Fallback for unknown error types
      throw new Error('An unknown error occurred.');
    }
  }
};
