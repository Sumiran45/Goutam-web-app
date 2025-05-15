import { StyleSheet, Dimensions } from 'react-native';
import { colors, moderateScale, verticalScale } from '../admin/theme';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background.overlay,
    padding: 0,
  },
  modalContent: {
    backgroundColor: colors.background.secondary,
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    padding: moderateScale(4),
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(12),
  },
  statText: {
    fontSize: moderateScale(12),
    color: colors.text.light,
    marginLeft: moderateScale(4),
  },
  modalBody: {
    padding: moderateScale(16),
    flex: 1,
  },
  articleTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: moderateScale(16),
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(24),
  },
  authorAvatar: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(8),
  },
  authorInitial: {
    color: colors.text.white,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  authorName: {
    fontSize: moderateScale(14),
    color: colors.text.primary,
    fontWeight: '500',
  },
  articleDate: {
    fontSize: moderateScale(12),
    color: colors.text.light,
    marginTop: moderateScale(2),
  },
  articleContent: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: colors.text.primary,
    marginBottom: moderateScale(24),
  },
});

export default styles;