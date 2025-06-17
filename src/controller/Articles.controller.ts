import api from '../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Article = {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  content: string;
  youtube_link?: string;
};

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    console.log('Fetching articles...');
    const res = await api.get('/articles');
    console.log('API Response:', res.data);
    
    if (!res.data || !Array.isArray(res.data)) {
      console.warn('Invalid response format:', res.data);
      return [];
    }

    const articles = res.data.map((a: any) => {
      console.log('Processing article:', a);
      
      return {
        id: a.id || a._id || Math.random().toString(),
        title: a.heading || a.title || 'Untitled',
        author: a.author?.name || a.author?.username || 'Unknown',
        date: a.date || new Date().toISOString(),
        summary: a.body ? (a.body.substring(0, 100) + (a.body.length > 100 ? '...' : '')) : 'No content',
        content: a.body || '',
        youtube_link: a.youtube_link
      };
    }).reverse();

    console.log(`Processed ${articles.length} articles`);
    return articles;
    
  } catch (error:any) {
    console.error('Error fetching articles:', error);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    return [];
  }
};

export const testAPIConnection = async (): Promise<boolean> => {
  try {
    const res = await api.get('/articles');
    console.log('API connection test successful');
    return true;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};