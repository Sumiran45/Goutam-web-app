import { StyleSheet } from 'react-native';
import { colors, moderateScale } from './theme';

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
    marginTop: moderateScale(12),
    fontSize: moderateScale(16),
    color: colors.text.secondary,
    fontWeight: '500',
  },

  header: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(16),
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },

  headerTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: moderateScale(4),
  },

  headerSubtitle: {
    fontSize: moderateScale(14),
    color: colors.text.secondary,
    fontWeight: '500',
  },
  
  searchContainer: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(16),
    backgroundColor: colors.background.primary,
  },
  
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  
  searchInput: {
    flex: 1,
    marginLeft: moderateScale(12),
    fontSize: moderateScale(16),
    color: colors.text.primary,
    fontWeight: '400',
  },
  
  listContent: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(20),
  },
  
  userCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(12),
    padding: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border.light,
  },

  userCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  userCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  userCardRight: {
    alignItems: 'flex-end',
    marginLeft: moderateScale(16),
  },
  
  avatar: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(28),
    marginRight: moderateScale(16),
  },

  avatarPlaceholder: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarInitials: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#fff',
  },
  
  userInfo: {
    flex: 1,
  },
  
  userName: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: moderateScale(4),
  },
  
  userEmail: {
    fontSize: moderateScale(14),
    color: colors.text.secondary,
    marginBottom: moderateScale(8),
    fontWeight: '400',
  },
  
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  metaText: {
    fontSize: moderateScale(12),
    color: colors.text.secondary,
    marginLeft: moderateScale(6),
    fontWeight: '500',
  },
  
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(20),
    marginBottom: moderateScale(8),
  },
  
  statusDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    marginRight: moderateScale(6),
  },
  
  statusText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    textTransform: 'capitalize',
  },

  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(8),
  },

  roleText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    textTransform: 'capitalize',
    marginLeft: moderateScale(4),
  },
  
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(60),
  },

  emptyIconContainer: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  
  emptyText: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: moderateScale(8),
  },
  
  emptySubtext: {
    fontSize: moderateScale(14),
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
  
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  detailsModal: {
    backgroundColor: colors.background.primary,
    borderRadius: moderateScale(20),
    width: '92%',
    maxWidth: 500,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(20),
  },
  
  modalTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: colors.text.primary,
  },
  
  userDetailsContainer: {
    padding: moderateScale(24),
  },
  
  userDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(24),
  },
  
  detailAvatar: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    marginRight: moderateScale(20),
  },
  
  userDetailInfo: {
    flex: 1,
  },
  
  detailName: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: moderateScale(6),
  },
  
  detailEmail: {
    fontSize: moderateScale(16),
    color: colors.text.secondary,
    marginBottom: moderateScale(12),
    fontWeight: '400',
  },

  detailBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  detailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(16),
    marginRight: moderateScale(8),
    marginBottom: moderateScale(4),
  },
  
  detailStatus: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: moderateScale(16),
  },
  
  userDetails: {
    backgroundColor: colors.background.secondary,
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    marginBottom: moderateScale(24),
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  
  detailRow: {
    flexDirection: 'row',
    marginBottom: moderateScale(12),
    alignItems: 'center',
  },
  
  detailLabel: {
    width: '35%',
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.text.secondary,
  },
  
  detailValue: {
    flex: 1,
    fontSize: moderateScale(14),
    color: colors.text.primary,
    fontWeight: '500',
  },
  
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(20),
    flex: 1,
    marginHorizontal: moderateScale(6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  secondaryButton: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1.5,
    borderColor: colors.border.medium,
  },

  dangerButton: {
    backgroundColor: colors.danger,
  },
  
  actionButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
  
  confirmModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  confirmModal: {
    backgroundColor: colors.background.primary,
    borderRadius: moderateScale(20),
    width: '85%',
    padding: moderateScale(28),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },

  confirmIconContainer: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  
  confirmTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: moderateScale(12),
    textAlign: 'center',
  },
  
  confirmText: {
    fontSize: moderateScale(16),
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: moderateScale(24),
    marginBottom: moderateScale(28),
  },
  
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  
  confirmButton: {
    flex: 1,
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  cancelButton: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1.5,
    borderColor: colors.border.medium,
  },
  
  confirmActionButton: {
    // backgroundColor will be set dynamically based on action type
  },
  
  cancelButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text.primary,
  },
  
  confirmButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#fff',
  },
});