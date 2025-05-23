import { StyleSheet } from 'react-native';
import { colors, moderateScale } from './theme';
import { globalStyles } from './global';

export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  loadingText: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(16),
    color: colors.text.primary,
  },
  searchContainer: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
  },
  searchInput: {
    flex: 1,
    marginLeft: moderateScale(8),
    fontSize: moderateScale(14),
    color: colors.text.primary,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(10),
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor:colors.border.light,
    flexWrap: 'wrap',
  },
  sortLabel: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: colors.text.secondary,
    marginRight: moderateScale(8),
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    marginRight: moderateScale(12),
  },
  sortButtonText: {
    fontSize: moderateScale(12),
    color: colors.text.primary,
  },
  sortIcon: {
    marginLeft: moderateScale(4),
  },
  listContent: {
    padding: moderateScale(12),
  },
  userCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(12),
    padding: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  avatar: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    marginRight: moderateScale(12),
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: moderateScale(2),
  },
  userEmail: {
    fontSize: moderateScale(12),
    color: colors.text.secondary,
    marginBottom: moderateScale(4),
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: moderateScale(11),
    color: colors.text.secondary,
    marginLeft: moderateScale(4),
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(12),
  },
  statusDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    marginRight: moderateScale(4),
  },
  statusText: {
    fontSize: moderateScale(10),
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  userCardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: moderateScale(12),
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  statsItem: {
    alignItems: 'center',
    flex: 1,
  },
  statsValue: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: moderateScale(4),
  },
  statsLabel: {
    fontSize: moderateScale(10),
    color: colors.text.secondary,
    marginTop: moderateScale(2),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(40),
  },
  emptyText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: moderateScale(12),
  },
  emptySubtext: {
    fontSize: moderateScale(14),
    color: colors.text.secondary,
    marginTop: moderateScale(4),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsModal: {
    backgroundColor: colors.background.primary,
    borderRadius: moderateScale(12),
    width: '90%',
    maxWidth: 500,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.text.primary,
  },
  userDetailsContainer: {
    padding: moderateScale(16),
  },
  userDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  detailAvatar: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
    marginRight: moderateScale(16),
  },
  userDetailInfo: {
    flex: 1,
  },
  detailName: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: moderateScale(4),
  },
  detailEmail: {
    fontSize: moderateScale(14),
    color: colors.text.secondary,
    marginBottom: moderateScale(6),
  },
  detailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    alignSelf: 'flex-start',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(12),
  },
  detailStatus: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  userStatsContainer: {
    marginBottom: moderateScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: moderateScale(12),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: moderateScale(10),
    padding: moderateScale(16),
    alignItems: 'center',
    marginHorizontal: moderateScale(6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: moderateScale(8),
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: colors.text.secondary,
    marginTop: moderateScale(4),
  },
  userDetails: {
    backgroundColor: colors.background.secondary,
    borderRadius: moderateScale(10),
    padding: moderateScale(16),
    marginBottom: moderateScale(20),
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: moderateScale(12),
  },
  detailLabel: {
    width: '35%',
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: colors.text.secondary,
  },
  detailValue: {
    flex: 1,
    fontSize: moderateScale(14),
    color: colors.text.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    flex: 1,
    marginHorizontal: moderateScale(6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
  confirmModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmModal: {
    backgroundColor: colors.background.primary,
    borderRadius: moderateScale(12),
    width: '80%',
    padding: moderateScale(20),
    alignItems: 'center',
  },
  confirmTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: moderateScale(12),
  },
  confirmText: {
    fontSize: moderateScale(14),
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: moderateScale(20),
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginHorizontal: moderateScale(6),
  },
  cancelButton: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  cancelButtonText: {
    color: colors.text.primary,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
})