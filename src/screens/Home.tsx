import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { CalendarScreen } from '../screens/tabs/calender';
import { StatsScreen } from '../screens/tabs/stats';
import { NotesScreen } from '../screens/tabs/notes';
import { SettingsScreen } from '../screens/tabs/settings';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }:any) => ({
        tabBarIcon: ({ focused }:any) => {
          let iconName;

          if (route.name === 'Calendar') {
            iconName = '📅';
          } else if (route.name === 'Stats') {
            iconName = '📊';
          } else if (route.name === 'Notes') {
            iconName = '📝';
          } else if (route.name === 'Settings') {
            iconName = '⚙️';
          }

          return <Text style={{ fontSize: 24 }}>{iconName}</Text>;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#555',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          backgroundColor: '#ffffff',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        }
      })}
    >
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;