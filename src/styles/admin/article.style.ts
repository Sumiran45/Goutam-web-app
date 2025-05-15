import { StyleSheet, Dimensions } from 'react-native';
import { colors, moderateScale, verticalScale } from '../../../src/styles/admin/theme';
import { globalStyles } from '../../../src/styles/admin/global';

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
  filterContainerWrapper: {
    zIndex: 10,
    backgroundColor: colors.background.main,
    paddingBottom: moderateScale(10),
    marginBottom: moderateScale(5),
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  filterContainer: {
    flexGrow: 0,
  },
  filterContentContainer: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(5),
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

  //filter style 
    filterButton: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(20),
    backgroundColor: colors.background.secondary,
    marginRight: moderateScale(8),
    ...globalStyles.cardShadow,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    color: colors.text.primary,
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: colors.text.white,
  },

  // new article modal style

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
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: moderateScale(16),
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  cancelButton: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(8),
    marginRight: moderateScale(12),
  },
  cancelButtonText: {
    fontSize: moderateScale(14),
    color: colors.text.secondary,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(8),
  },
  saveButtonText: {
    fontSize: moderateScale(14),
    color: colors.text.white,
    fontWeight: '600',
  },
});

export default styles;