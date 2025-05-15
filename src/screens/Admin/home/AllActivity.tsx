import React, { useState } from 'react';
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

// Import styles and data
import { globalStyles } from '../../../styles/admin/global';
import { colors, moderateScale } from '../../../styles/admin/theme';
import { allActivities } from '../../../components/Data/activity';

const AllActivitiesScreen = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activities, setActivities] = useState(allActivities);

  const handleFilterChange = (filter:any) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      setActivities(allActivities);
    } else {
      const now = new Date();
      let timeAgo;
      
      switch (filter) {
        case 'day':
          timeAgo = new Date(now.setDate(now.getDate() - 1));
          break;
        case 'week':
          timeAgo = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          timeAgo = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case 'year':
          timeAgo = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          timeAgo = null;
      }
      
      if (timeAgo) {
        const filteredActivities = allActivities.filter((_, index) => {
          return index % (filter === 'day' ? 5 : filter === 'week' ? 3 : filter === 'month' ? 2 : 1) === 0;
        });
        
        setActivities(filteredActivities);
      }
    }
  };

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
        renderItem={({ item }) => (
          <ActivityItem
            text={item.text}
            time={item.time}
            icon={item.icon}
          />
        )}
        keyExtractor={(_, index) => `activity-${index}`}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="inbox" size={moderateScale(48)} color={colors.text.light} />
            <Text style={styles.emptyText}>No activities found for this filter</Text>
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