import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatBox from '../home/statBox';
import ActivityItem from '../home/activityItem';
import QuickActions from './quickAction';

// Import styles
import { globalStyles } from '../../../styles/admin/global';
import { styles } from '../../../styles/admin/admin.style';
import { colors } from '../../../styles/admin/theme';

import { fetchUsers } from '../../../Api/AdminDasboard.api';
import { fetchArticles } from '../../../controller/Articles.controller';
import { fetchProducts } from '../../../controller/Product.controller';
import { activityController, Activity } from '../../../controller/Activity.controller';

const DashboardContent = () => {
  const navigation = useNavigation();
  const [userCount, setUserCount] = useState<number | null>(null);
  const [articleCount, setArticleCount] = useState<number | null>(null);
  const [productCount, setProductCount] = useState<number>(0);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        if (Array.isArray(users)) {
          setUserCount(users.length);
        }
      } catch (error) {
        console.error('Failed to fetch user count:', error);
      }
    };

    const getArticles = async () => {
      try {
        const articles = await fetchArticles();
        if (Array.isArray(articles)) {
          setArticleCount(articles.length);
        }
      } catch (error) {
        console.error('Failed to fetch article count:', error);
      }
    };

    const getRecentActivities = async () => {
      try {
        const activities = await activityController.getActivities({ limit: 3 });
        setRecentActivities(activities);
      } catch (error) {
        console.error('Failed to fetch recent activities:', error);
        setRecentActivities([]);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
    getArticles();
    getRecentActivities();
  }, []);

  useEffect(() => {
    const loadProductCount = async () => {
      try {
        const products = await fetchProducts();
        setProductCount(products.length);
      } catch (error) {
        setProductCount(0);
      }
    };
    loadProductCount();
  }, []);

  const navigateToAllActivities = () => {
    navigation.navigate('AllActivities' as never);
  };

  return (
    <ScrollView style={globalStyles.content} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.welcomeText}>Welcome back, Admin!</Text>
      <Text style={globalStyles.heading}>Dashboard Overview</Text>

      <View style={styles.statBoxContainer}>
        <StatBox label="Total Users" value={userCount !== null ? userCount.toString() : '...'} icon="users" color={colors.primary} />
        <StatBox label="Articles" value={articleCount !== null ? articleCount.toString() : '...'} icon="file-alt" color={colors.secondary} />
        <StatBox label="Products" value={productCount.toString()} icon="box" color={colors.warning} />
      </View>

      <QuickActions />

      <View style={styles.recentActivityContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={navigateToAllActivities}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityList}>
          {loading ? (
            <Text style={styles.loadingText}>Loading activities...</Text>
          ) : recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <ActivityItem
                key={`activity-${activity.id}-${index}`}
                activity={activity}
                showUserName={true}
              />
            ))
          ) : (
            <Text style={styles.noActivitiesText}>No recent activities found</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardContent;