import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { CalendarScreen } from '../screens/tabs/calender';
import { ArticlesScreen } from './tabs/articles';
import { ArticleDetailScreen } from './tabs/ArticleDetailScreen';
import { SettingsScreen } from '../screens/tabs/settings';
import { ShopScreen } from './tabs/shops';
import { DoctorsScreen } from './tabs/DoctorsScreen';
import DoctorDetailScreen from './tabs/doctorDetail';

const Tab = createBottomTabNavigator();
const ArticlesStack = createStackNavigator();
const DoctorsStack = createStackNavigator();

const ArticlesNavigator = () => {
  return (
    <ArticlesStack.Navigator screenOptions={{ headerShown: false }}>
      <ArticlesStack.Screen name="ArticlesList" component={ArticlesScreen} />
      <ArticlesStack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </ArticlesStack.Navigator>
  );
};

const DoctorsNavigator = () => {
  return (
    <DoctorsStack.Navigator screenOptions={{ headerShown: false }}>
      <DoctorsStack.Screen name="DoctorsList" component={DoctorsScreen} />
      <DoctorsStack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
    </DoctorsStack.Navigator>
  );
};

const TabIcon = ({ iconName, focused }:any) => (
  <View style={{
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  }}>
    <Text style={{ 
      fontSize: focused ? 26 : 24, 
      opacity: focused ? 1 : 0.7,
    }}>
      {iconName}
    </Text>
  </View>
);

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Calendar"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Calendar') {
            iconName = '📅';
          } else if (route.name === 'Shop') {
            iconName = '🛒';
          } else if (route.name === 'Articles') {
            iconName = '📰';
          } else if (route.name === 'Doctors') {
            iconName = '👩‍⚕️';
          } else if (route.name === 'Settings') {
            iconName = '⚙️';
          }

          return <TabIcon iconName={iconName} focused={focused} />;
        },
        tabBarActiveTintColor: '#E91E63',
        tabBarInactiveTintColor: '#9E9E9E',
        headerShown: false, 
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: '#FFFFFF',
          height: 70,
          paddingTop: 8,
          paddingBottom: 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 2,
        }
      })}
    >
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen} 
        options={{ 
          headerShown: false,
          tabBarLabel: 'Cycle'
        }} 
      />
      <Tab.Screen 
        name="Articles" 
        component={ArticlesNavigator} 
        options={{ 
          headerShown: false,
          tabBarLabel: 'Learn'
        }} 
      />
      <Tab.Screen 
        name="Doctors" 
        component={DoctorsNavigator} 
        options={{ 
          headerShown: false,
          tabBarLabel: 'Doctors'
        }} 
      />
      <Tab.Screen 
        name="Shop" 
        component={ShopScreen} 
        options={{ 
          headerShown: false,
          tabBarLabel: 'Shop'
        }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          headerShown: false,
          tabBarLabel: 'Profile'
        }} 
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
