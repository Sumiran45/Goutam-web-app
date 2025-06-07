import { StyleSheet, Dimensions } from 'react-native';
import { colors, moderateScale, verticalScale } from '../admin/theme';
import { globalStyles } from '../admin/global';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    height: verticalScale(40),
    ...globalStyles.cardShadow,
  },
  searchIcon: {
    marginRight: moderateScale(8),
  },
  searchInput: {
    flex: 1,
    color: colors.text.primary,
    fontSize: moderateScale(14),
  },
  addButton: {
    marginLeft: moderateScale(12),
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    ...globalStyles.cardShadow,
  },
  addButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Updated filter container styles for better scrolling
  filterContainerWrapper: {
    zIndex: 10,
    backgroundColor: colors.background.main,
    paddingBottom: moderateScale(10),
    marginBottom: moderateScale(5),
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    maxHeight: moderateScale(60),
  },
  filterContainer: {
    flexGrow: 0,
    maxHeight: moderateScale(50),
  },
  filterContentContainer: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(5),
    alignItems: 'center',
    minWidth: width,
  },
  articleList: {
    padding: moderateScale(16),
    paddingTop: moderateScale(8),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
  },
  emptyText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.text.secondary,
    marginTop: moderateScale(16),
  },
  emptySubtext: {
    fontSize: moderateScale(14),
    color: colors.text.light,
    marginTop: moderateScale(8),
    textAlign: 'center',
  },
  
  // Article item styles
  articleItem: {
    backgroundColor: colors.background.secondary,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
    ...globalStyles.cardShadow,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(8),
  },
  authorInitial: {
    color: colors.text.white,
    fontSize: moderateScale(14),
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
  },
  deleteButton: {
    padding: moderateScale(4),
  },
  articleTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.text.primary,
    marginVertical: moderateScale(8),
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(12),
  },
  articleStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  statText: {
    fontSize: moderateScale(12),
    color: colors.text.light,
    marginLeft: moderateScale(4),
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: moderateScale(12),
    color: colors.primary,
    fontWeight: '500',
  },
  readMoreIcon: {
    marginLeft: moderateScale(4),
  },

  // Filter button styles 
  filterButton: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(20),
    backgroundColor: colors.background.secondary,
    marginRight: moderateScale(8),
    ...globalStyles.cardShadow,
    minWidth: moderateScale(70),
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    color: colors.text.primary,
    fontSize: moderateScale(14),
    fontWeight: '500',
    textAlign: 'center',
  },
  filterButtonTextActive: {
    color: colors.text.white,
  },

  // New article modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background.overlay,
    padding: moderateScale(isSmallDevice ? 12 : 20),
  },
  modalContent: {
    backgroundColor: colors.background.secondary,
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  modalBody: {
    padding: moderateScale(16),
    maxHeight: verticalScale(500),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: moderateScale(6),
  },
  textInput: {
    backgroundColor: colors.background.main,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    fontSize: moderateScale(14),
    color: colors.text.primary,
    marginBottom: moderateScale(16),
  },
  contentInput: {
    height: verticalScale(200),
    textAlignVertical: 'top',
  },
  
  // YouTube section styles for NewArticleModal
  youtubeSection: {
    marginTop: moderateScale(8),
  },
  youtubeLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(6),
  },
  youtubeLabel: {
    marginLeft: moderateScale(8),
    marginBottom: 0,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(4),
    paddingHorizontal: moderateScale(4),
  },
  errorText: {
    fontSize: moderateScale(12),
    color: colors.error,
    marginLeft: moderateScale(4),
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(4),
    paddingHorizontal: moderateScale(4),
  },
  successText: {
    fontSize: moderateScale(12),
    color: colors.success || colors.primary,
    marginLeft: moderateScale(4),
  },
  
  // Modal footer styles
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(16),
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.main,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: colors.background.secondary,
    marginRight: moderateScale(8),
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: colors.text.secondary,
  },
  saveButton: {
    flex: 1,
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: colors.primary,
    marginLeft: moderateScale(8),
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: colors.text.light,
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.text.white,
  },
});

export default styles;