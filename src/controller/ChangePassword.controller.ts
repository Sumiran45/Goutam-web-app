import axios, { AxiosError } from 'axios';
import api from '../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ChangePassword = async (
  currentPassword: any,
  newPassword: any,
  confirmPassword: any
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Token:', token);
    const response = await api.post(
      '/change-password',
      {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, message: response.data.message };
  } catch (err) {
    const error = err as AxiosError<{ detail: string }>;
    return {
      success: false,
      message: error.response?.data?.detail || 'Something went wrong',
    };
  }
};
