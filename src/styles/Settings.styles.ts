import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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