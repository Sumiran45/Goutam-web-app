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
  // Card-related styles
  card: {
    backgroundColor: colors.background.card,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(12),
  },
  cardTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text.primary,
  },
  cardSubtitle: {
    fontSize: moderateScale(14),
    color: colors.text.secondary,
    marginTop: moderateScale(2),
  },
  cardContent: {
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(12),
    paddingTop: moderateScale(12),
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  // Button styles
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text.white,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  secondaryButtonText: {
    color: colors.text.primary,
  },
  // Input styles
  inputContainer: {
    marginBottom: moderateScale(16),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    color: colors.text.primary,
    marginBottom: moderateScale(8),
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border.input,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    fontSize: moderateScale(16),
    color: colors.text.primary,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  // List styles
  listContainer: {
    backgroundColor: colors.background.card,
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
    backgroundColor: colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  listItemLast: {
    borderBottomWidth: 0,
  },
  listItemText: {
    flex: 1,
    fontSize: moderateScale(16),
    color: colors.text.primary,
  },
  listItemSubtext: {
    fontSize: moderateScale(14),
    color: colors.text.secondary,
    marginTop: moderateScale(2),
  },
  // Placeholder styles
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
  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: moderateScale(16),
  },
  // Status styles
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(12),
    backgroundColor: colors.background.secondary,
  },
  statusText: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    marginLeft: moderateScale(4),
  },
  statusSuccess: {
    backgroundColor: colors.success + '20',
  },
  statusSuccessText: {
    color: colors.success,
  },
  statusWarning: {
    backgroundColor: colors.warning + '20',
  },
  statusWarningText: {
    color: colors.warning,
  },
  statusError: {
    backgroundColor: colors.error + '20',
  },
  statusErrorText: {
    color: colors.error,
  },
  statusInfo: {
    backgroundColor: colors.info + '20',
  },
  statusInfoText: {
    color: colors.info,
  },
});