import api from '../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Article = {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  content: string;
};

export const fetchArticles = async (): Promise<Article[]> => {
  const res = await api.get('/articles');
  return res.data.map((a: any) => ({
    id: a.id || a._id || Math.random().toString(),
    title: a.heading,
    author: a.author?.name || 'Unknown',
    date: a.date,
    summary: a.body.substring(0, 100) + '...',
    content: a.body,
  })).reverse();
};

export const addArticle = async (title: string, content: string): Promise<Article> => {
  const token = await AsyncStorage.getItem('token');
  const res = await api.post(
    '/articles',
    {
      heading: title,
      body: content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const a = res.data;
  return {
    id: a.id || a._id || Math.random().toString(),
    title: a.heading,
    author: a.author?.email || 'You',
    date: a.date,
    summary: a.body.substring(0, 100) + '...',
    content: a.body,
  };
};
