import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors, moderateScale, verticalScale } from './theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.main,
  },
  loadingText: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(16),
    color: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    height: verticalScale(60),
    backgroundColor: colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuButton: {
    padding: moderateScale(8),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.text.primary,
  },
  notificationButton: {
    padding: moderateScale(8),
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: moderateScale(8),
    right: moderateScale(8),
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: colors.error,
  },
  content: {
    flex: 1,
    padding: moderateScale(16),
  },
  welcomeText: {
    fontSize: moderateScale(14),
    color: colors.text.secondary,
    marginBottom: moderateScale(4),
  },
  heading: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: moderateScale(16),
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: colors.background.overlay,
  },
  cardShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  placeholderText: {
    marginTop: moderateScale(16),
    fontSize: moderateScale(16),
    color: colors.text.secondary,
    textAlign: 'center',
  },
});