import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../Api/api';

import { User } from '../types/User.type';

export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  age?: string;
  weight?: string;
  height?: string;
  lastPeriodDate?: string;
  cycleLength?: string;
  periodLength?: string;
  symptoms?: string[];
  goals?: string[];
  profile?:{
    firstName: string | null;
    lastName: string | null;
  }
}

export const getProfile = async (): Promise<User> => {
  const token = await AsyncStorage.getItem('token');
  const response = await api.get('/profile', {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.user; 
};

export const updateProfile = async (data: ProfileUpdateData) => {
  const token = await AsyncStorage.getItem('token');
  
  const response = await api.put('/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data; 
};