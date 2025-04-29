import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export const StatsScreen = () => {
  const screenWidth = Dimensions.get('window').width;

  const cycleData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [28, 30, 27, 29, 28, 29],
        color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Cycle Length (Days)"]
  };

  const periodData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [5, 6, 5, 5, 4, 5],
        color: (opacity = 1) => `rgba(131, 90, 241, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Period Duration (Days)"]
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>STATS & INSIGHTS</Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Cycle Length</Text>
          <LineChart
            data={cycleData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          <View style={styles.averageContainer}>
            <View style={styles.averageItem}>
              <Text style={styles.averageValue}>28.5</Text>
              <Text style={styles.averageLabel}>Average Cycle (Days)</Text>
            </View>
            <View style={styles.averageItem}>
              <Text style={styles.averageValue}>5</Text>
              <Text style={styles.averageLabel}>Average Period (Days)</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Period Duration</Text>
          <LineChart
            data={periodData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>Your Insights</Text>
          <View style={styles.insightItem}>
            <Text style={styles.insightText}>Your cycle has been regular for the past 6 months</Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightText}>You typically experience cramps on day 2 of your period</Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightText}>Your next period is expected in 12 days</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 10,
  },
  averageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  averageItem: {
    alignItems: 'center',
  },
  averageValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  averageLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  insightsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  insightItem: {
    backgroundColor: '#f8f4ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#835af1',
  },
  insightText: {
    fontSize: 14,
    color: '#444',
  },
});