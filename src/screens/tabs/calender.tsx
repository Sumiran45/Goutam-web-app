import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Modal } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import { useSymptomContext } from '../../Context/SymptomContext';
import { SymptomForm } from '../../components/symptom/SymptomForm';
import { PredictionCard } from '../../components/symptom/PredictionCard';
import { AnalyticsCard } from '../../components/symptom/AnalyticsCard';
import { styles } from '../../styles/Home.styles';

export const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState<string>(
    new Date().toLocaleString('default', { month: 'long' }).toUpperCase()
  );
  const [showSymptomForm, setShowSymptomForm] = useState(false);
  const [isToday, setIsToday] = useState(true);

  const {
    markedDates,
    todaySymptoms,
    prediction,
    suggestions,
    analytics,
    loading,
    refreshData,
    saveSymptom,
  } = useSymptomContext();

  // Update isToday when selectedDate changes
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setIsToday(selectedDate === today);
  }, [selectedDate]);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const handleMonthChange = (month: any) => {
    const monthName = new Date(month.year, month.month - 1, 1)
      .toLocaleString('default', { month: 'long' })
      .toUpperCase();
    setCurrentMonth(monthName);
  };

  const handleSaveSymptoms = async (data: any) => {
    await saveSymptom({
      ...data,
      date: selectedDate,
      id: todaySymptoms?.id || '',
    });
    setShowSymptomForm(false);
    await refreshData();
  };

  const renderAddButton = () => {
    if (!isToday) return null;

    return (
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowSymptomForm(true)}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>
          {todaySymptoms ? 'Update Today\'s Log' : 'Log Today\'s Symptoms'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{currentMonth}</Text>
      </View>

      {/* Calendar */}
      <Calendar
        style={styles.calendar}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#3498db',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#3498db',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#3498db',
          selectedDotColor: '#ffffff',
          arrowColor: '#3498db',
          monthTextColor: '#3498db',
          indicatorColor: '#3498db',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            ...markedDates[selectedDate],
            selected: true,
            selectedColor: '#3498db',
          },
        }}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
      />

      <ScrollView style={styles.contentContainer}>
        {isToday && (
          <>
            <PredictionCard
              prediction={prediction}
              suggestions={suggestions}
              loading={loading}
            />
            {renderAddButton()}
          </>
        )}

        {/* Analytics Section */}
        <AnalyticsCard 
          analytics={analytics}
          loading={loading}
        />

        {/* Display today's symptoms if logged */}
        {todaySymptoms && isToday && (
          <View style={styles.todaysLogContainer}>
            <Text style={styles.sectionTitle}>Today's Log</Text>
            <View style={styles.symptomItem}>
              <Text style={styles.symptomLabel}>Mood:</Text>
              <Text style={styles.symptomValue}>{todaySymptoms.mood || 'Not specified'}</Text>
            </View>
            {todaySymptoms.cramps && (
              <View style={styles.symptomItem}>
                <Text style={styles.symptomLabel}>Cramps:</Text>
                <Text style={styles.symptomValue}>{todaySymptoms.cramps}</Text>
              </View>
            )}
            {todaySymptoms.flow_level && (
              <View style={styles.symptomItem}>
                <Text style={styles.symptomLabel}>Flow:</Text>
                <Text style={styles.symptomValue}>{todaySymptoms.flow_level}</Text>
              </View>
            )}
            <View style={styles.symptomItem}>
              <Text style={styles.symptomLabel}>Symptoms:</Text>
              <Text style={styles.symptomValue}>
                {[
                  todaySymptoms.headache ? 'Headache' : null,
                  todaySymptoms.nausea ? 'Nausea' : null,
                  todaySymptoms.fatigue ? 'Fatigue' : null,
                ]
                  .filter(Boolean)
                  .join(', ') || 'None'}
              </Text>
            </View>
            {todaySymptoms.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>Notes:</Text>
                <Text style={styles.notesText}>{todaySymptoms.notes}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Symptom Form Modal */}
      <Modal
        visible={showSymptomForm}
        animationType="slide"
        onRequestClose={() => setShowSymptomForm(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {todaySymptoms ? 'Update Symptoms' : 'Log Symptoms'}
            </Text>
            <TouchableOpacity
              onPress={() => setShowSymptomForm(false)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color="#2d4150" />
            </TouchableOpacity>
          </View>
          <SymptomForm
            initialData={todaySymptoms || undefined}
            onSubmit={handleSaveSymptoms}
            onCancel={() => setShowSymptomForm(false)}
            isEditing={!!todaySymptoms}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};