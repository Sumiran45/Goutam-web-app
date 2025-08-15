import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PredictionResponse, SuggestionResponse } from '../../types/symptom.types';

interface PredictionCardProps {
  prediction: PredictionResponse | null;
  suggestions: SuggestionResponse | null;
  loading: boolean;
}

const getConfidenceColor = (confidence: string) => {
  switch (confidence.toLowerCase()) {
    case 'high':
      return '#2ecc71';
    case 'medium':
      return '#f39c12'; 
    case 'low':
    default:
      return '#e74c3c'; 
  }
};

export const PredictionCard: React.FC<PredictionCardProps> = ({
  prediction,
  suggestions,
  loading,
}) => {
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Analyzing your data...</Text>
      </View>
    );
  }

  if (!prediction || !suggestions) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          {prediction === null && suggestions === null
            ? 'No prediction data available. Log more symptoms to get predictions.'
            : 'Incomplete prediction data. Please try again later.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tomorrow's Prediction</Text>
        <View style={styles.confidenceBadge}>
          <Text style={styles.confidenceText}>
            {Math.round(prediction.confidence_score * 100)}% Confidence
          </Text>
        </View>
      </View>

      {prediction.predicted_symptoms.length > 0 ? (
        <View style={styles.predictionContainer}>
          {prediction.predicted_symptoms.map((symptom, index) => (
            <View key={index} style={styles.symptomItem}>
              <View style={styles.symptomHeader}>
                <Text style={styles.symptomName}>{symptom.symptom}</Text>
                <View style={styles.probabilityBadge}>
                  <Text style={styles.probabilityText}>
                    {Math.round(symptom.probability * 100)}%
                  </Text>
                </View>
              </View>
              <View style={styles.confidenceMeter}>
                <View
                  style={[
                    styles.confidenceFill,
                    {
                      width: `${symptom.probability * 100}%`,
                      backgroundColor: getConfidenceColor(symptom.confidence),
                    },
                  ]}
                />
              </View>
              <Text style={styles.confidenceLabel}>
                Confidence: {symptom.confidence}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noSymptomsText}>
          No significant symptoms predicted for tomorrow.
        </Text>
      )}

      {suggestions.suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.sectionTitle}>Suggestions</Text>
          {suggestions.suggestions.map((suggestion, index) => (
            <View key={index} style={styles.suggestionItem}>
              <View style={styles.suggestionIcon}>
                {suggestion.category === 'remedy' && (
                  <MaterialIcons name="healing" size={20} color="#e74c3c" />
                )}
                {suggestion.category === 'lifestyle' && (
                  <MaterialIcons name="self-improvement" size={20} color="#3498db" />
                )}
                {suggestion.category === 'medical' && (
                  <MaterialIcons name="medical-services" size={20} color="#2ecc71" />
                )}
              </View>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                <Text style={styles.suggestionText}>{suggestion.description}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  noDataText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d4150',
  },
  confidenceBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
  },
  predictionContainer: {
    marginBottom: 16,
  },
  symptomItem: {
    marginBottom: 12,
  },
  symptomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  symptomName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d4150',
    textTransform: 'capitalize',
  },
  probabilityBadge: {
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  probabilityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7f8c8d',
  },
  confidenceMeter: {
    height: 6,
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    marginVertical: 6,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  confidenceLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textTransform: 'capitalize',
  },
  noSymptomsText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingVertical: 10,
  },
  suggestionsContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d4150',
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
  },
  suggestionIcon: {
    marginRight: 12,
    justifyContent: 'center',
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d4150',
    marginBottom: 4,
  },
  suggestionText: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 18,
  },
});
