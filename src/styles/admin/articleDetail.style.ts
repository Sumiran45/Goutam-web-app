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
  
  // Video Section Styles
  videoSection: {
    backgroundColor: colors.background.main,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: moderateScale(24),
  },
  videoSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  videoSectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: moderateScale(8),
  },
  videoThumbnailContainer: {
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    marginBottom: moderateScale(12),
  },
  videoThumbnail: {
    height: verticalScale(120),
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoThumbnailImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  videoThumbnailFallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
  },
  videoThumbnailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: colors.error, // YouTube red
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  videoInfo: {
    paddingVertical: moderateScale(8),
  },
  videoTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.text.primary,
  },
  videoSubtitle: {
    fontSize: moderateScale(12),
    color: colors.text.light,
    marginTop: moderateScale(2),
  },
  testVideoLabel: {
    fontSize: moderateScale(10),
    color: colors.primary,
    fontStyle: 'italic',
    marginTop: moderateScale(2),
  },
  videoDescription: {
    fontSize: moderateScale(12),
    color: colors.text.light,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  
  // Content Section Styles
  contentSection: {
    marginBottom: moderateScale(24),
  },
  contentSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
    paddingBottom: moderateScale(8),
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  contentSectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: moderateScale(8),
  },
  articleContent: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: colors.text.primary,
    textAlign: 'justify',
  },
  
  // Bottom spacer
  bottomSpacer: {
    height: moderateScale(32),
  },
});

export default styles;