import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavItem from '../home/navItem';
import { colors, moderateScale, verticalScale } from '../../../styles/admin/theme';

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  closeSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, closeSidebar }) => {
  const handleNavPress = (tabName: string) => {
    setActiveTab(tabName);
    closeSidebar();
  };

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.sidebar}
    >
      <View style={styles.sidebarHeader}>
        <View style={styles.adminProfile}>
          <View style={styles.adminAvatar}>
            <Text style={styles.adminInitial}>A</Text>
          </View>
          <View style={styles.adminInfo}>
            <Text style={styles.adminName}>Admin User</Text>
            <Text style={styles.adminRole}>Super Admin</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={closeSidebar}
          style={styles.closeButton}
        >
          <Icon name="times" size={moderateScale(18)} color={colors.text.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.sidebarDivider} />

      <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false}>
        <NavItem
          icon="tachometer-alt"
          label="Dashboard"
          isActive={activeTab === 'dashboard'}
          onPress={() => handleNavPress('dashboard')}
        />
        <NavItem
          icon="users"
          label="Users"
          isActive={activeTab === 'users'}
          onPress={() => handleNavPress('users')}
        />
        <NavItem
          icon="file-alt"
          label="Articles"
          isActive={activeTab === 'articles'}
          onPress={() => handleNavPress('articles')}
        />
        <NavItem
          icon="shopping-cart"
          label="Products"
          isActive={activeTab === 'products'}
          onPress={() => handleNavPress('products')}
        />
        <NavItem
          icon="chart-bar"
          label="Analytics"
          isActive={activeTab === 'analytics'}
          onPress={() => handleNavPress('analytics')}
        />
        <NavItem
          icon="cog"
          label="Settings"
          isActive={activeTab === 'settings'}
          onPress={() => handleNavPress('settings')}
        />
      </ScrollView>

      <View style={styles.sidebarFooter}>
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="sign-out-alt" size={moderateScale(16)} color={colors.text.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(16),
  },
  adminProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminAvatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminInitial: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: colors.text.white,
  },
  adminInfo: {
    marginLeft: moderateScale(10),
  },
  adminName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text.white,
  },
  adminRole: {
    fontSize: moderateScale(12),
    color: 'rgba(255, 255, 255, 0.7)',
  },
  closeButton: {
    padding: moderateScale(4),
  },
  sidebarDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: moderateScale(8),
  },
  sidebarContent: {
    flex: 1,
    paddingHorizontal: moderateScale(12),
    paddingTop: moderateScale(8),
  },
  sidebarFooter: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
  },
  logoutText: {
    color: colors.text.white,
    marginLeft: moderateScale(12),
    fontSize: moderateScale(14),
  },
});

export default Sidebar;

