import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ActivityItemProps } from '../../../types/type';
import { colors, moderateScale } from '../../../styles/admin/theme';

const ActivityItem: React.FC<ActivityItemProps> = ({ text, time, icon }) => (
  <View style={styles.activityItem}>
    <View style={styles.activityIcon}>
      <Icon name={icon || "bell"} size={moderateScale(14)} color={colors.primary} />
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityText}>{text}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.border.medium,
  },
  activityIcon: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: moderateScale(14),
    color: colors.text.primary,
  },
  activityTime: {
    fontSize: moderateScale(12),
    color: colors.text.light,
    marginTop: moderateScale(2),
  },
});

export default ActivityItem;

