
export type MoodType = 'happy' | 'sad' | 'irritated' | 'anxious' | 'calm' | 'excited' | 'depressed';
export type CrampIntensity = 'none' | 'mild' | 'moderate' | 'strong';
export type FlowLevel = 'none' | 'light' | 'medium' | 'heavy';
export type SleepQuality = 'poor' | 'fair' | 'good' | 'excellent';

export interface SymptomInput {
  mood?: MoodType;
  cramps?: CrampIntensity;
  headache?: boolean;
  nausea?: boolean;
  fatigue?: boolean;
  flow_level?: FlowLevel;
  sleep_quality?: SleepQuality;
  food_cravings?: string;
  notes?: string;
}

export interface SymptomResponse extends SymptomInput {
  id: string;
  user_id: string;
  date: string;
  created_at: string;
}

export interface PredictedSymptom {
  symptom: string;
  probability: number;
  confidence: 'low' | 'medium' | 'high';
}

export interface PredictionResponse {
  date: string;
  predicted_symptoms: PredictedSymptom[];
  confidence_score: number;
  based_on_days: number;
}

export interface Suggestion {
  category: 'remedy' | 'lifestyle' | 'medical' | 'preparation';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export interface SuggestionResponse {
  suggestions: Suggestion[];
  based_on_symptoms: string[];
  date: string; // ISO date string
}

export interface SymptomAnalytics {
  total_entries: number;
  date_range: {
    start: string; // ISO date string
    end: string; // ISO date string
  };
  most_common_mood?: string;
  average_cramp_intensity?: string;
  symptom_frequency: {
    [key: string]: number;
  };
  patterns: string[];
}

// For marking dates in the calendar
export interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
    selected?: boolean;
    selectedColor?: string;
    customStyles?: {
      container: {
        backgroundColor: string;
      };
      text: {
        color: string;
        fontWeight: 'bold';
      };
    };
  };
}

// For the symptom form
export interface SymptomFormData extends Omit<SymptomInput, 'cramps' | 'flow_level' | 'sleep_quality'> {
  cramps: CrampIntensity | null;
  flow_level: FlowLevel | null;
  sleep_quality: SleepQuality | null;
}

// Initial form values
export const initialSymptomForm: SymptomFormData = {
  mood: undefined,
  cramps: null,
  headache: false,
  nausea: false,
  fatigue: false,
  flow_level: null,
  sleep_quality: null,
  food_cravings: '',
  notes: ''
};
