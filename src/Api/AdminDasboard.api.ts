import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api'; // axios instance


export const fetchUsers = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); // await here

    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.get('/admin/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json',
      },
    });

    return response.data; // axios response has `data` directly
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const deleteUser = async (userID: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');
  
      const response = await api.delete(`/admin/admin/users/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  export const deleteArrticle = async (articleID: string) => {
    try {
    //   const token = await AsyncStorage.getItem('token');
    //   if (!token) throw new Error('No token found');
  
      const response = await api.delete(`/articles/${articleID}`, {
        headers: {
        //   Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error deleting Article:', error);
      throw error;
    }
  };