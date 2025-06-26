import api from '../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Article = {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  content: string;
  videoUrl?: string; 
  likes?: number;
  comments?: number;
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
        videoUrl: a.youtube_link || '', 
        likes: Math.floor(Math.random() * 100), 
        comments: Math.floor(Math.random() * 50), 
      };
    }).reverse();

    console.log(`Processed ${articles.length} articles`);
    return articles;
    
  } catch (error: any) {
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

export const addArticle = async (title: string, content: string, videoUrl?: string): Promise<Article> => {
  try {
    console.log('Creating new article...');
    
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const articleData = {
      heading: title.trim(),
      body: content.trim(),
      youtube_link: videoUrl?.trim() || null 
    };

    console.log('Sending article data:', articleData);

    const res = await api.post('/CreateArticles', articleData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Article created successfully:', res.data);

    const createdArticle: Article = {
      id: res.data.id || res.data._id,
      title: res.data.heading,
      author: res.data.author?.name || res.data.author?.username || 'Unknown',
      date: res.data.date,
      summary: res.data.body ? (res.data.body.substring(0, 100) + (res.data.body.length > 100 ? '...' : '')) : 'No content',
      content: res.data.body,
      videoUrl: res.data.youtube_link || '', 
      likes: 0,
      comments: 0,
    };

    return createdArticle;

  } catch (error: any) {
    console.error('Error creating article:', error);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      
      if (error.response.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      } else if (error.response.status === 400) {
        const errorMessage = error.response.data?.detail || 'Invalid article data';
        throw new Error(errorMessage);
      } else if (error.response.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('Network error. Please check your connection.');
    }
    
    throw new Error(error.message || 'Failed to create article');
  }
};

export const updateArticle = async (articleId: string, title: string, content: string, videoUrl?: string): Promise<Article> => {
  try {
    console.log('Updating article...');
    
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const articleData = {
      heading: title.trim(),
      body: content.trim(),
      youtube_link: videoUrl?.trim() || null 
    };

    console.log('Sending update data:', articleData);

    const res = await api.put(`/articles/${articleId}`, articleData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Article updated successfully:', res.data);

    const updatedArticle: Article = {
      id: res.data.id || res.data._id,
      title: res.data.heading,
      author: res.data.author?.name || res.data.author?.username || 'Unknown',
      date: res.data.date,
      summary: res.data.body ? (res.data.body.substring(0, 100) + (res.data.body.length > 100 ? '...' : '')) : 'No content',
      content: res.data.body,
      videoUrl: res.data.youtube_link || '',
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
    };

    return updatedArticle;

  } catch (error: any) {
    console.error('Error updating article:', error);
    
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      } else if (error.response.status === 403) {
        throw new Error('You are not authorized to update this article.');
      } else if (error.response.status === 404) {
        throw new Error('Article not found.');
      } else if (error.response.status === 400) {
        const errorMessage = error.response.data?.detail || 'Invalid article data';
        throw new Error(errorMessage);
      }
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw new Error(error.message || 'Failed to update article');
  }
};

export const deleteArticle = async (articleId: string): Promise<void> => {
  try {
    console.log('Deleting article...');
    
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    await api.delete(`/articles/${articleId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    console.log('Article deleted successfully');

  } catch (error: any) {
    console.error('Error deleting article:', error);
    
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      } else if (error.response.status === 403) {
        throw new Error('You are not authorized to delete this article.');
      } else if (error.response.status === 404) {
        throw new Error('Article not found.');
      }
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw new Error(error.message || 'Failed to delete article');
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