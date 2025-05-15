import { StyleSheet } from 'react-native';
import { colors, moderateScale } from './theme';
import { globalStyles } from './global';

export const styles = StyleSheet.create({
  statBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: moderateScale(-4),
    marginBottom: moderateScale(16),
  },
  recentActivityContainer: {
    backgroundColor: colors.background.card,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
    ...globalStyles.cardShadow,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: moderateScale(12),
  },
  viewAllText: {
    fontSize: moderateScale(12),
    color: colors.primary,
    fontWeight: '500',
  },
  activityList: {
    marginTop: moderateScale(8),
  },
  quickActionsContainer: {
    backgroundColor: colors.background.card,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
    ...globalStyles.cardShadow,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: moderateScale(-4),
  },
  quickActionButton: {
    width: '25%',
    padding: moderateScale(4),
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  quickActionIcon: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(4),
  },
  quickActionLabel: {
    fontSize: moderateScale(12),
    color: colors.text.primary,
    textAlign: 'center',
  },
  notificationsContainer: {
    backgroundColor: colors.background.card,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  notificationItem_last: {
    borderBottomWidth: 0,
  },
  notificationIcon: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: `${colors.secondary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.text.primary,
  },
  notificationMessage: {
    fontSize: moderateScale(12),
    color: colors.text.secondary,
    marginTop: moderateScale(2),
  },
  notificationTime: {
    fontSize: moderateScale(10),
    color: colors.text.light,
    marginTop: moderateScale(4),
  },
});