// screens/SettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Switch, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [periodReminders, setPeriodReminders] = useState(true);
  const [ovulationAlerts, setOvulationAlerts] = useState(true);
  const [symptomTracking, setSymptomTracking] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
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
          
          <TouchableOpacity style={styles.accountButton}>
            <Text style={styles.accountButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.accountButton}>
            <Text style={styles.accountButtonText}>Privacy Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.accountButton, styles.logoutButton]}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutItemText}>Terms of Service</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutItemText}>Privacy Policy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutItemText}>Help & Support</Text>
          </TouchableOpacity>
          
          <Text style={styles.versionText}>App Version 1.0.0</Text>
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
  section: {
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingDescription: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  accountButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  accountButtonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#ffe0e0',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  aboutItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  aboutItemText: {
    fontSize: 16,
    color: '#3498db',
  },
  versionText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
});