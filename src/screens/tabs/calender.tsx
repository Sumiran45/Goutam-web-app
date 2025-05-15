import React, { useState } from 'react';
import { View, Text, ScrollView, Image, SafeAreaView, StatusBar } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { periodDays, dailyTips, recommendedExercises } from '../../types/type';
import { styles } from '../../styles/Home.styles';

export const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState('MAY');

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
          textDayHeaderFontSize: 14
        }}
        markedDates={{
          ...periodDays,
          [selectedDate]: { ...periodDays[selectedDate], selected: true }
        }}
        onDayPress={(day:any) => setSelectedDate(day.dateString)}
        onMonthChange={(month:any) => {
          const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                             'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
          setCurrentMonth(monthNames[month.month - 1]);
        }}
      />

      <ScrollView style={styles.contentContainer}>
        {/* Tips */}
        <View style={styles.tipsContainer}>
          {Object.entries(dailyTips).map(([title, items], index) => (
            <View key={index}>
              <Text style={styles.tipsTitle}>{title}</Text>
              {items.map((item:any, idx:any) => (
                <View key={idx} style={styles.tipItem}>
                  <View style={styles.tipIconContainer}>
                    <Text style={styles.tipIcon}>{item.icon}</Text>
                  </View>
                  <Text style={styles.tipText}>{item.text}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Exercises */}
        <View style={styles.exercisesContainer}>
          <Text style={styles.exercisesTitle}>Recommended Exercises</Text>
          <View style={styles.exercisesList}>
            {recommendedExercises.map((exercise:any, index:any) => (
              <View key={index} style={styles.exerciseItem}>
                <Image source={exercise.image} style={styles.exerciseImage} />
                <Text style={styles.exerciseText}>{exercise.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};