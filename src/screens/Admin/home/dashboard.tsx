import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatBox from '../home/statBox';
import ActivityItem from '../home/activityItem';
import QuickActions from './quickAction';

// Import styles
import { globalStyles } from '../../../styles/admin/global';
import { styles } from '../../../styles/admin/admin.style';
import { colors } from '../../../styles/admin/theme';

import { recentActivities } from '../../../components/Data/activity';

const DashboardContent = () => {
  const navigation = useNavigation();

  const navigateToAllActivities = () => {
    navigation.navigate('AllActivities' as never);
  };

  return (
    <ScrollView style={globalStyles.content} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.welcomeText}>Welcome back, Admin!</Text>
      <Text style={globalStyles.heading}>Dashboard Overview</Text>

      <View style={styles.statBoxContainer}>
        <StatBox label="Total Users" value="1,254" icon="users" color={colors.primary} />
        <StatBox label="Articles" value="87" icon="file-alt" color={colors.secondary} />
        <StatBox label="Products" value="63" icon="box" color={colors.warning} />
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
          {recentActivities.slice(0, 3).map((activity:any, index:any) => (
            <ActivityItem
              key={`activity-${index}`}
              text={activity.text}
              time={activity.time}
              icon={activity.icon}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardContent;