import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { SymptomAnalytics } from '../../types/symptom.types';

const screenWidth = Dimensions.get('window').width - 32;

interface AnalyticsCardProps {
  analytics: SymptomAnalytics | null;
  loading: boolean;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ analytics, loading }) => {
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading analytics...</Text>
      </View>
    );
  }

  if (!analytics) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          No analytics data available. Log more symptoms to see your patterns.
        </Text>
      </View>
    );
  }

  const { symptom_frequency, most_common_mood, average_cramp_intensity, patterns } = analytics;

  // Prepare data for the bar chart
  const symptomLabels = Object.keys(symptom_frequency);
  const symptomData = Object.values(symptom_frequency);
  const totalDays = analytics.total_entries;

  const chartData = {
    labels: symptomLabels.map(label => 
      label.charAt(0).toUpperCase() + label.slice(1)
    ),
    datasets: [
      {
        data: symptomData,
        colors: [
          (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
          (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
          (opacity = 1) => `rgba(155, 89, 182, ${opacity})`,
          (opacity = 1) => `rgba(230, 126, 34, ${opacity})`,
        ],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.6,
    propsForLabels: {
      fontSize: 12,
    },
  };

  const getMoodEmoji = (mood?: string) => {
    if (!mood) return '😐';
    const moodEmojis: Record<string, string> = {
      happy: '😊',
      sad: '😢',
      irritated: '😠',
      anxious: '😰',
      calm: '😌',
      excited: '🤩',
      depressed: '😔',
    };
    return moodEmojis[mood.toLowerCase()] || '😐';
  };

  const getCrampEmoji = (intensity?: string) => {
    if (!intensity) return '⚪';
    const intensityEmojis: Record<string, string> = {
      none: '⚪',
      mild: '🟢',
      moderate: '🟡',
      strong: '🔴',
    };
    return intensityEmojis[intensity.toLowerCase()] || '⚪';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Symptom Analytics</Text>
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Days Tracked</Text>
          <Text style={styles.summaryValue}>{totalDays}</Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Common Mood</Text>
          <View style={styles.moodContainer}>
            <Text style={styles.moodEmoji}>{getMoodEmoji(most_common_mood)}</Text>
            <Text style={styles.summaryValue}>
              {most_common_mood ? most_common_mood.charAt(0).toUpperCase() + most_common_mood.slice(1) : 'N/A'}
            </Text>
          </View>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Avg. Cramps</Text>
          <View style={styles.moodContainer}>
            <Text style={styles.moodEmoji}>{getCrampEmoji(average_cramp_intensity)}</Text>
            <Text style={styles.summaryValue}>
              {average_cramp_intensity ? average_cramp_intensity.charAt(0).toUpperCase() + average_cramp_intensity.slice(1) : 'None'}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.chartTitle}>Symptom Frequency (Last {totalDays} Days)</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={screenWidth}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero
          showBarTops={false}
          withInnerLines={false}
          withHorizontalLabels={true}
          withVerticalLabels={true}
          style={styles.chart}
        />
      </View>

      {patterns.length > 0 && (
        <View style={styles.patternsContainer}>
          <Text style={styles.patternsTitle}>Patterns</Text>
          {patterns.map((pattern, index) => (
            <View key={index} style={styles.patternItem}>
              <MaterialIcons name="info" size={16} color="#3498db" style={styles.patternIcon} />
              <Text style={styles.patternText}>{pattern}</Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d4150',
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d4150',
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodEmoji: {
    marginRight: 4,
    fontSize: 18,
  },
  chartContainer: {
    alignItems: 'center',
    marginLeft: -16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d4150',
    marginBottom: 12,
    marginTop: 8,
  },
  patternsContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 16,
  },
  patternsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d4150',
    marginBottom: 12,
  },
  patternItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  patternIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  patternText: {
    flex: 1,
    fontSize: 14,
    color: '#2d4150',
    lineHeight: 20,
  },
});
