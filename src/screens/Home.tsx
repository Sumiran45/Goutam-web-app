import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { CalendarScreen } from '../screens/tabs/calender';
import { NotesScreen } from './tabs/notes';
import { SettingsScreen } from '../screens/tabs/settings';
import {ShopScreen} from '../screens/tabs/shop';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Calendar') {
            iconName = '📅';
          } else if (route.name === 'Shop') {
            iconName = '🛒';
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
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Shop" 
        component={ShopScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Notes" 
        component={NotesScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
