import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Import components
import Sidebar from './home/sidebar';
import DashboardContent from './home/dashboard';
import UsersScreen from './home/tabs/userScreen';
import { globalStyles } from '../../styles/admin/global';
import { colors, moderateScale } from '../../styles/admin/theme';
import ArticlesScreen from './home/tabs/article/articleScreen';

const { width } = Dimensions.get('window');

export default function AdminScreen({ navigation }:any) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width < height ? 'portrait' : 'landscape');
    };

    updateOrientation();

    Dimensions.addEventListener('change', updateOrientation);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      Dimensions.removeEventListener('change', updateOrientation);
    };
  }, []);

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardContent navigation={navigation} />;
      case 'users':
        return <UsersScreen navigation={navigation} />;
      case 'articles':
        return <ArticlesScreen navigation={navigation} />
      default:
        return (
          <View style={globalStyles.placeholderContainer}>
            <Icon
              name={
                activeTab === 'products' ? 'shopping-cart' :
                activeTab === 'analytics' ? 'chart-bar' : 'cog'
              }
              size={moderateScale(40)}
              color={colors.primary}
            />
            <Text style={globalStyles.placeholderText}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section coming soon
            </Text>
          </View>
        );
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={globalStyles.loadingText}>Loading dashboard...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f8fa" />

      <View style={globalStyles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={globalStyles.menuButton}>
          <Icon name="bars" size={moderateScale(18)} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</Text>
        <TouchableOpacity style={globalStyles.notificationButton}>
          <Icon name="bell" size={moderateScale(18)} color={colors.text.primary} />
          <View style={globalStyles.badge} />
        </TouchableOpacity>
      </View>

      {renderActiveTab()}

      <Modal
        visible={sidebarVisible}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setSidebarVisible(false)}
      >
        <TouchableOpacity
          style={globalStyles.modalBackdrop}
          onPress={() => setSidebarVisible(false)}
          activeOpacity={1}
        >
          <View
            style={[
              styles.sidebarWrapper,
              orientation === 'landscape' && styles.sidebarWrapperLandscape
            ]}
          >
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              closeSidebar={() => setSidebarVisible(false)}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = {
  sidebarWrapper: {
    width: width * 0.8,
    maxWidth: 300,
    height: '100%',
    backgroundColor: colors.primary,
  },
  sidebarWrapperLandscape: {
    width: width * 0.4,
  },
};