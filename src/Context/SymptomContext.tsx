import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SymptomResponse, PredictionResponse, SuggestionResponse, SymptomAnalytics, MarkedDates } from '../types/symptom.types';
import { symptomApi } from '../Api/symptom.api';

type SymptomContextType = {
  todaySymptoms: SymptomResponse | null;
  markedDates: MarkedDates;
  prediction: PredictionResponse | null;
  suggestions: SuggestionResponse | null;
  analytics: SymptomAnalytics | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  saveSymptom: (data: SymptomResponse) => Promise<void>;
  deleteSymptom: (symptomId: string) => Promise<void>;
};

const SymptomContext = createContext<SymptomContextType | undefined>(undefined);

export const SymptomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todaySymptoms, setTodaySymptoms] = useState<SymptomResponse | null>(null);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestionResponse | null>(null);
  const [analytics, setAnalytics] = useState<SymptomAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load today's symptoms
      const todayData = await symptomApi.getTodaySymptoms();
      setTodaySymptoms(todayData);

      // Load history for calendar marks
      const history = await symptomApi.getSymptomHistory(90);
      updateMarkedDates(history);

      // Load prediction for tomorrow
      const predictionData = await symptomApi.getTomorrowPrediction();
      setPrediction(predictionData);

      // Load suggestions
      const suggestionData = await symptomApi.getSuggestions(true);
      setSuggestions(suggestionData);

      // Load analytics
      const analyticsData = await symptomApi.getAnalytics(90);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Error loading symptom data:', err);
      setError('Failed to load symptom data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateMarkedDates = (symptoms: SymptomResponse[]) => {
    const marks: MarkedDates = {};
    
    symptoms.forEach(symptom => {
      marks[symptom.date] = {
        marked: true,
        dotColor: getDotColor(symptom),
        customStyles: {
          container: {
            backgroundColor: getBackgroundColor(symptom),
          },
          text: {
            color: getTextColor(symptom),
            fontWeight: 'bold' as const,
          },
        },
      };
    });

    // Mark today
    const today = new Date().toISOString().split('T')[0];
    if (marks[today]) {
      marks[today].selected = true;
      marks[today].selectedColor = '#3498db';
    }

    setMarkedDates(marks);
  };

  const getDotColor = (symptom: SymptomResponse): string => {
    if (symptom.cramps === 'strong' || symptom.flow_level === 'heavy') return '#ff6b6b';
    if (symptom.cramps === 'moderate' || symptom.flow_level === 'medium') return '#feca57';
    if (symptom.cramps === 'mild' || symptom.flow_level === 'light') return '#1dd1a1';
    return '#3498db';
  };

  const getBackgroundColor = (symptom: SymptomResponse): string => {
    if (symptom.flow_level === 'heavy') return 'rgba(255, 107, 107, 0.2)';
    if (symptom.flow_level === 'medium') return 'rgba(254, 202, 87, 0.2)';
    if (symptom.flow_level === 'light') return 'rgba(29, 209, 161, 0.2)';
    return 'transparent';
  };

  const getTextColor = (symptom: SymptomResponse): string => {
    if (symptom.flow_level) return '#2f3542';
    if (symptom.cramps === 'strong') return '#ff6b6b';
    if (symptom.cramps === 'moderate') return '#f39c12';
    if (symptom.cramps === 'mild') return '#1dd1a1';
    return '#2d4150';
  };

  const saveSymptom = async (data: SymptomResponse) => {
    try {
      setLoading(true);
      const savedSymptom = await symptomApi.saveTodaySymptoms(data);
      setTodaySymptoms(savedSymptom);
      await loadData(); // Refresh all data
    } catch (err) {
      console.error('Error saving symptom:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSymptom = async (symptomId: string) => {
    try {
      setLoading(true);
      await symptomApi.deleteSymptom(symptomId);
      await loadData(); // Refresh all data
    } catch (err) {
      console.error('Error deleting symptom:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SymptomContext.Provider
      value={{
        todaySymptoms,
        markedDates,
        prediction,
        suggestions,
        analytics,
        loading,
        error,
        refreshData: loadData,
        saveSymptom,
        deleteSymptom,
      }}
    >
      {children}
    </SymptomContext.Provider>
  );
};

export const useSymptomContext = (): SymptomContextType => {
  const context = useContext(SymptomContext);
  if (context === undefined) {
    throw new Error('useSymptomContext must be used within a SymptomProvider');
  }
  return context;
};
