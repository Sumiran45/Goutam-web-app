import { SymptomResponse, PredictedSymptom, Suggestion } from '../types/symptom.types';

// Simple prediction algorithm (this would be more sophisticated in a real app)
export class SymptomPredictor {
  private static instance: SymptomPredictor;
  
  private constructor() {}
  
  public static getInstance(): SymptomPredictor {
    if (!SymptomPredictor.instance) {
      SymptomPredictor.instance = new SymptomPredictor();
    }
    return SymptomPredictor.instance;
  }

  // Predict symptoms for tomorrow based on historical data
  public predictTomorrowSymptoms(
    symptoms: SymptomResponse[],
    targetDate: string
  ): { predicted_symptoms: PredictedSymptom[]; confidence_score: number } {
    if (symptoms.length === 0) {
      return {
        predicted_symptoms: [],
        confidence_score: 0,
      };
    }

    const lastWeek = this.getLastNDays(symptoms, 7);
    const lastMonth = this.getLastNDays(symptoms, 30);

    // Simple prediction based on recent symptoms
    const predictedSymptoms: PredictedSymptom[] = [];
    
    // Predict cramps
    const crampsPrediction = this.predictSymptom('cramps', lastWeek, lastMonth);
    if (crampsPrediction.probability > 0.3) {
      predictedSymptoms.push({
        symptom: 'cramps',
        probability: crampsPrediction.probability,
        confidence: crampsPrediction.confidence,
      });
    }

    // Predict headache
    const headachePrediction = this.predictSymptom('headache', lastWeek, lastMonth);
    if (headachePrediction.probability > 0.3) {
      predictedSymptoms.push({
        symptom: 'headache',
        probability: headachePrediction.probability,
        confidence: headachePrediction.confidence,
      });
    }

    // Predict fatigue
    const fatiguePrediction = this.predictSymptom('fatigue', lastWeek, lastMonth);
    if (fatiguePrediction.probability > 0.3) {
      predictedSymptoms.push({
        symptom: 'fatigue',
        probability: fatiguePrediction.probability,
        confidence: fatiguePrediction.confidence,
      });
    }

    // Predict nausea
    const nauseaPrediction = this.predictSymptom('nausea', lastWeek, lastMonth);
    if (nauseaPrediction.probability > 0.3) {
      predictedSymptoms.push({
        symptom: 'nausea',
        probability: nauseaPrediction.probability,
        confidence: nauseaPrediction.confidence,
      });
    }

    // Calculate overall confidence score (simple average for now)
    const confidenceScores = predictedSymptoms.map(s => {
      switch (s.confidence) {
        case 'high': return 1.0;
        case 'medium': return 0.7;
        case 'low':
        default:
          return 0.4;
      }
    });
    
    const confidence_score = confidenceScores.length > 0
      ? confidenceScores.reduce((a, b) => a + b, 0) / confidenceScores.length
      : 0.8; // Default confidence if no symptoms predicted

    return {
      predicted_symptoms: predictedSymptoms,
      confidence_score: Math.min(Math.max(confidence_score, 0), 1), // Ensure between 0 and 1
    };
  }

  // Generate suggestions based on current and predicted symptoms
  public generateSuggestions(
    currentSymptoms: SymptomResponse | null,
    predictedSymptoms: PredictedSymptom[]
  ): { suggestions: Suggestion[]; based_on_symptoms: string[] } {
    const suggestions: Suggestion[] = [];
    const basedOn: string[] = [];

    // Add suggestions based on current symptoms
    if (currentSymptoms) {
      // Cramps
      if (currentSymptoms.cramps === 'strong') {
        suggestions.push({
          category: 'remedy',
          title: 'For Strong Cramps',
          description: 'Try a warm compress on your lower abdomen and consider taking an over-the-counter pain reliever if needed.',
          priority: 'high',
        });
        basedOn.push('strong cramps');
      } else if (currentSymptoms.cramps === 'moderate') {
        suggestions.push({
          category: 'remedy',
          title: 'For Cramps',
          description: 'Gentle stretching or a warm bath may help relieve your cramps.',
          priority: 'medium',
        });
        basedOn.push('moderate cramps');
      }

      // Headache
      if (currentSymptoms.headache) {
        suggestions.push({
          category: 'remedy',
          title: 'Headache Relief',
          description: 'Stay hydrated and rest in a quiet, dark room. Consider taking a break from screens.',
          priority: 'medium',
        });
        basedOn.push('headache');
      }

      // Fatigue
      if (currentSymptoms.fatigue) {
        suggestions.push({
          category: 'lifestyle',
          title: 'Combat Fatigue',
          description: 'Try to get some light exercise and stay hydrated. A short walk might help boost your energy levels.',
          priority: 'medium',
        });
        basedOn.push('fatigue');
      }
    }

    // Add suggestions based on predicted symptoms
    predictedSymptoms.forEach(symptom => {
      if (symptom.symptom === 'cramps' && symptom.probability > 0.5) {
        suggestions.push({
          category: 'preparation',
          title: 'Prepare for Cramps',
          description: 'Based on your history, you might experience cramps soon. Consider having pain relief options ready.',
          priority: symptom.confidence,
        });
        basedOn.push('predicted cramps');
      }

      if (symptom.symptom === 'fatigue' && symptom.probability > 0.6) {
        suggestions.push({
          category: 'lifestyle',
          title: 'Plan for Rest',
          description: 'You might feel fatigued soon. Try to schedule some downtime and prioritize rest.',
          priority: symptom.confidence,
        });
        basedOn.push('predicted fatigue');
      }
    });

    // Add general wellness suggestions
    suggestions.push({
      category: 'lifestyle',
      title: 'Stay Hydrated',
      description: 'Drink plenty of water throughout the day to help with overall well-being.',
      priority: 'low',
    });

    suggestions.push({
      category: 'lifestyle',
      title: 'Balanced Nutrition',
      description: 'Eat a balanced diet with plenty of fruits, vegetables, and whole grains.',
      priority: 'low',
    });

    return {
      suggestions: this.deduplicateSuggestions(suggestions),
      based_on_symptoms: [...new Set(basedOn)], // Remove duplicates
    };
  }

  // Helper methods
  private getLastNDays(symptoms: SymptomResponse[], days: number): SymptomResponse[] {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return symptoms.filter(s => new Date(s.date) >= cutoff);
  }

  private predictSymptom(
    symptom: 'cramps' | 'headache' | 'fatigue' | 'nausea',
    lastWeek: SymptomResponse[],
    lastMonth: SymptomResponse[]
  ): { probability: number; confidence: 'low' | 'medium' | 'high' } {
    // Count occurrences in last week and month
    const weekCount = lastWeek.filter(s => {
      if (symptom === 'cramps') return s.cramps && s.cramps !== 'none';
      return s[symptom] === true;
    }).length;

    const monthCount = lastMonth.filter(s => {
      if (symptom === 'cramps') return s.cramps && s.cramps !== 'none';
      return s[symptom] === true;
    }).length;

    // Simple weighted average (recent data has more weight)
    const weekWeight = 0.7;
    const monthWeight = 0.3;
    
    const weekProbability = lastWeek.length > 0 ? weekCount / lastWeek.length : 0;
    const monthProbability = lastMonth.length > 0 ? monthCount / lastMonth.length : 0;
    
    let probability = (weekProbability * weekWeight) + (monthProbability * monthWeight);
    
    // Adjust based on symptom type
    if (symptom === 'cramps') {
      probability *= 1.1; // Slightly higher probability for cramps
    }

    // Determine confidence
    let confidence: 'low' | 'medium' | 'high' = 'low';
    const totalCount = weekCount + monthCount;
    
    if (totalCount >= 5) {
      confidence = 'high';
    } else if (totalCount >= 2) {
      confidence = 'medium';
    }

    return {
      probability: Math.min(Math.max(probability, 0), 1), // Clamp between 0 and 1
      confidence,
    };
  }

  private deduplicateSuggestions(suggestions: Suggestion[]): Suggestion[] {
    const seen = new Set<string>();
    return suggestions.filter(suggestion => {
      const key = `${suggestion.title}-${suggestion.description}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
}

export const symptomPredictor = SymptomPredictor.getInstance();
