import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

export default function AdminScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const Sidebar = () => (
    <View style={styles.sidebarContainer}>
      <View style={styles.sidebar}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'dashboard' && styles.activeNavItem]}
          onPress={() => {
            setActiveTab('dashboard');
            setSidebarVisible(false);
          }}
        >
          <Icon name="dashboard" size={18} color="#fff" style={styles.icon} />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'users' && styles.activeNavItem]}
          onPress={() => {
            setActiveTab('users');
            setSidebarVisible(false);
          }}
        >
          <Icon name="users" size={18} color="#fff" style={styles.icon} />
          <Text style={styles.navText}>Users</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'articles' && styles.activeNavItem]}
          onPress={() => {
            setActiveTab('articles');
            setSidebarVisible(false);
          }}
        >
          <Icon name="file-text" size={18} color="#fff" style={styles.icon} />
          <Text style={styles.navText}>Articles</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'products' && styles.activeNavItem]}
          onPress={() => {
            setActiveTab('products');
            setSidebarVisible(false);
          }}
        >
          <Icon name="shopping-cart" size={18} color="#fff" style={styles.icon} />
          <Text style={styles.navText}>Products</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const Content = () => (
    <View style={styles.content}>
      <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.hamburger}>
        <Icon name="bars" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.heading}>Admin Dashboard</Text>
      <View style={styles.statBoxContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Users</Text>
          <Text style={styles.statValue}>1,200</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Articles</Text>
          <Text style={styles.statValue}>85</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Products</Text>
          <Text style={styles.statValue}>60</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mobileContainer}>
      <Modal visible={sidebarVisible} animationType="slide" transparent={true}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={() => setSidebarVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.sidebarWrapper}>
            <Sidebar />
          </View>
        </TouchableOpacity>
      </Modal>
      <Content />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mobileContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  modalBackdrop: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  sidebarWrapper: {
    width: screenWidth * 0.75,
    backgroundColor: '#6200EE',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  sidebarContainer: {
    flex: 1,
  },
  sidebar: {
    flex: 1,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  activeNavItem: {
    backgroundColor: '#3700B3',
  },
  navText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    width: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  hamburger: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  statBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 2,
  },
  statLabel: {
    fontSize: 16,
    color: '#888',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});
