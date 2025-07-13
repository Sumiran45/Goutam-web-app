import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, moderateScale } from '../../../styles/admin/theme';
import { Activity } from '../../../controller/Activity.controller';

interface ActivityItemProps {
  activity: Activity;
  showUserName?: boolean;
  showEntityName?: boolean;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ 
  activity, 
  showUserName = false, 
  showEntityName = false 
}) => {
  const getDisplayText = () => {
    let text = activity.description || activity.title;
    
    if (showUserName && activity.user_name) {
      text = `${text}`;
    }
    
    if (showEntityName && activity.entity_name) {
      text = `${text} (${activity.entity_name})`;
    }
    
    return text;
  };

  const getFormattedTime = () => {
    try {
      const now = new Date();
      const activityDate = new Date(activity.created_at);
      const diffInMinutes = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60));

      if (diffInMinutes < 1) {
        return 'Just now';
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} min ago`;
      } else if (diffInMinutes < 1440) { 
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (diffInMinutes < 10080) {
        const days = Math.floor(diffInMinutes / 1440);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else {
        return activityDate.toLocaleDateString();
      }
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Unknown time';
    }
  };

  const getActivityIcon = () => {
    const iconMap: Record<string, string> = {
      'login': 'sign-in-alt',
      'logout': 'sign-out-alt',
      'create': 'plus',
      'update': 'edit',
      'delete': 'trash',
      'view': 'eye',
      'download': 'download',
      'upload': 'upload',
      'share': 'share',
      'comment': 'comment',
      'like': 'heart',
      'follow': 'user-plus',
      'unfollow': 'user-minus',
      'notification': 'bell',
      'error': 'exclamation-circle',
      'warning': 'exclamation-triangle',
      'success': 'check-circle',
      'info': 'info-circle'
    };

    return iconMap[activity.type] || activity.icon || 'bell';
  };

  const getIconColor = () => {
    const colorMap: Record<string, string> = {
      'error': colors.error || '#ff4444',
      'warning': colors.warning || '#ffaa00',
      'success': colors.success || '#00aa00',
      'delete': colors.error || '#ff4444',
      'create': colors.success || '#00aa00',
      'update': colors.warning || '#ffaa00',
    };

    return colorMap[activity.type] || colors.primary;
  };

  return (
    <View style={styles.activityItem}>
      <View style={[styles.activityIcon, { backgroundColor: `${getIconColor()}10` }]}>
        <Icon 
          name={getActivityIcon()} 
          size={moderateScale(14)} 
          color={getIconColor()} 
        />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityText}>{getDisplayText()}</Text>
        <Text style={styles.activityTime}>{getFormattedTime()}</Text>
        {activity.metadata && Object.keys(activity.metadata).length > 0 && (
          <Text style={styles.metadataText}>
            {Object.entries(activity.metadata)
              .filter(([key, value]) => value && key !== 'internal')
              .map(([key, value]) => `${key}: ${value}`)
              .join(' • ')
            }
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.border.medium,
  },
  activityIcon: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
    marginTop: moderateScale(2),
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: moderateScale(14),
    color: colors.text.primary,
    lineHeight: moderateScale(20),
  },
  activityTime: {
    fontSize: moderateScale(12),
    color: colors.text.light,
    marginTop: moderateScale(4),
  },
  metadataText: {
    fontSize: moderateScale(11),
    color: colors.text.secondary,
    marginTop: moderateScale(2),
    fontStyle: 'italic',
  },
});

export default ActivityItem;