import api from '../Api/api';
import { SymptomInput, SymptomResponse, PredictionResponse, SuggestionResponse, SymptomAnalytics } from '../types/symptom.types';

export const symptomApi = {
  // Get today's symptoms
  getTodaySymptoms: async (): Promise<SymptomResponse | null> => {
    try {
      const response = await api.get('/symptoms/today');
      return response.data;
    } catch (error:any) {
      if (error.response?.status === 404) return null;
      throw error;
    }
  },

  // Save today's symptoms
  saveTodaySymptoms: async (data: SymptomInput): Promise<SymptomResponse> => {
    const response = await api.post('/symptoms/today', data);
    return response.data;
  },

  // Get symptom history
  getSymptomHistory: async (days: number = 30): Promise<SymptomResponse[]> => {
    const response = await api.get(`/symptoms/history?days=${days}`);
    return response.data;
  },

  // Get prediction for tomorrow
  getTomorrowPrediction: async (): Promise<PredictionResponse> => {
    const response = await api.get('/symptoms/tomorrow');
    return response.data;
  },

  // Get suggestions
  getSuggestions: async (includePredictions: boolean = true): Promise<SuggestionResponse> => {
    const response = await api.get(`/symptoms/suggestions?include_predictions=${includePredictions}`);
    return response.data;
  },

  // Get analytics
  getAnalytics: async (days: number = 90): Promise<SymptomAnalytics> => {
    const response = await api.get(`/symptoms/analytics?days=${days}`);
    return response.data;
  },

  // Delete a symptom entry
  deleteSymptom: async (symptomId: string): Promise<void> => {
    await api.delete(`/symptoms/${symptomId}`);
  }
};
