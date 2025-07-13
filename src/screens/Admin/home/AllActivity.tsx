import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import ActivityItem from '../home/activityItem';
import FilterButtons from './filterButton';

// Import styles and controller
import { globalStyles } from '../../../styles/admin/global';
import { colors, moderateScale } from '../../../styles/admin/theme';
import { activityController, Activity } from '../../../controller/Activity.controller';

type FilterType = 'all' | 'day' | 'week' | 'month' | 'year';

const AllActivitiesScreen = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const fetchedActivities = await activityController.getActivities({ limit: 50 });
      const sortedActivities = fetchedActivities.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setActivities(sortedActivities);
    } catch (error) {
      console.error('Failed to load activities:', error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (filter: FilterType) => {
    setActiveFilter(filter);
    
    try {
      setLoading(true);
      let filteredActivities: Activity[] = [];
      
      if (filter === 'all') {
        filteredActivities = await activityController.getActivities({ limit: 50 });
      } else {
        filteredActivities = await activityController.getActivitiesByTimeFilter(filter);
      }
      
      // Sort activities by created_at in descending order (most recent first)
      const sortedActivities = filteredActivities.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      setActivities(sortedActivities);
    } catch (error) {
      console.error('Failed to filter activities:', error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const renderActivityItem = ({ item }: { item: Activity }) => (
    <ActivityItem
      activity={item}
      showUserName={true}
      showEntityName={true}
    />
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={moderateScale(18)} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Activities</Text>
        <View style={styles.placeholder} />
      </View>

      <FilterButtons activeFilter={activeFilter} onFilterChange={handleFilterChange} />

      <FlatList
        data={activities}
        contentContainerStyle={styles.listContainer}
        renderItem={renderActivityItem}
        keyExtractor={(item) => `activity-${item.id}`}
        refreshing={loading}
        onRefresh={loadActivities}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="inbox" size={moderateScale(48)} color={colors.text.light} />
            <Text style={styles.emptyText}>
              {loading ? 'Loading activities...' : 'No activities found for this filter'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    height: moderateScale(60),
    backgroundColor: colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    ...globalStyles.cardShadow,
  },
  backButton: {
    padding: moderateScale(8),
    width: moderateScale(40),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.text.primary,
  },
  placeholder: {
    width: moderateScale(40),
  },
  listContainer: {
    padding: moderateScale(16),
    paddingBottom: moderateScale(40),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(40),
  },
  emptyText: {
    marginTop: moderateScale(16),
    fontSize: moderateScale(16),
    color: colors.text.light,
    textAlign: 'center',
  },
});

export default AllActivitiesScreen;