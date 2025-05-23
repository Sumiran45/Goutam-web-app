import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../Api/api';

import { User } from '../types/User.type'; 

export const getProfile = async (): Promise<User> => {
    const token = await AsyncStorage.getItem('token');
  const response = await api.get('/profile', {
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};



export const updateProfile = async (data: { name: string}) => {
    const token = await AsyncStorage.getItem('token');
    
    const response = await api.put('/profile', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data;
  };