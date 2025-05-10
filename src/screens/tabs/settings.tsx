import React, { useState } from 'react';
import { styles } from '../../styles/Settings.styles';
import { View, Text, SafeAreaView, Switch, TouchableOpacity, ScrollView } from 'react-native';

export const SettingsScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState(true);
  const [periodReminders, setPeriodReminders] = useState(true);
  const [ovulationAlerts, setOvulationAlerts] = useState(true);
  const [symptomTracking, setSymptomTracking] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile' as never);
  };

  const navigateToTermsOfService = () => {
    navigation.navigate('TermsOfService');
  };

  const navigateToPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const navigateToHelpSupport = () => {
    navigation.navigate('HelpSupport');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SETTINGS</Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingDescription}>Receive app notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#d8d8d8', true: '#3498db' }}
              thumbColor={notifications ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Period Reminders</Text>
              <Text style={styles.settingDescription}>Get notified before your period</Text>
            </View>
            <Switch
              value={periodReminders}
              onValueChange={setPeriodReminders}
              trackColor={{ false: '#d8d8d8', true: '#3498db' }}
              thumbColor={periodReminders ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Ovulation Alerts</Text>
              <Text style={styles.settingDescription}>Get notified during fertile days</Text>
            </View>
            <Switch
              value={ovulationAlerts}
              onValueChange={setOvulationAlerts}
              trackColor={{ false: '#d8d8d8', true: '#3498db' }}
              thumbColor={ovulationAlerts ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Symptom Tracking</Text>
              <Text style={styles.settingDescription}>Track symptoms during your cycle</Text>
            </View>
            <Switch
              value={symptomTracking}
              onValueChange={setSymptomTracking}
              trackColor={{ false: '#d8d8d8', true: '#3498db' }}
              thumbColor={symptomTracking ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>Use dark theme</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#d8d8d8', true: '#3498db' }}
              thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

           <TouchableOpacity 
            style={styles.accountButton}
            onPress={navigateToEditProfile}
          >
            <Text style={styles.accountButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.accountButton}>
            <Text style={styles.accountButtonText}>Privacy Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.accountButton, styles.logoutButton]}
          onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.aboutItem} onPress={navigateToTermsOfService}>
            <Text style={styles.aboutItemText}>Terms of Service</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.aboutItem} onPress={navigateToPrivacyPolicy}>
            <Text style={styles.aboutItemText}>Privacy Policy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.aboutItem} onPress={navigateToHelpSupport}>
            <Text style={styles.aboutItemText}>Help & Support</Text>
          </TouchableOpacity>
          
          <Text style={styles.versionText}>App Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

