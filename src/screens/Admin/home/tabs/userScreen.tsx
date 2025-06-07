import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
  RefreshControl,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, moderateScale } from '../../../../styles/admin/theme';
import { deleteUser, fetchUsers } from '../../../../Api/AdminDasboard.api';
import { styles } from '../../../../styles/admin/userScreen.style'

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  status: 'active' | 'inactive';
  role: 'admin' | 'user';
  phone?: string;
  lastLogin?: string;
}

export default function UsersScreen({ navigation }: any) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [actionType, setActionType] = useState<'delete' | 'deactivate' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch users data
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      console.log("🚀 ~ getUsers ~ users:", fetchedUsers);
      
      // Add hardcoded name if not available
      const usersWithNames = fetchedUsers.map((user: any, index: number) => ({
        ...user,
        name: user.name || `User ${String.fromCharCode(65 + (index % 26))}${String.fromCharCode(66 + (index % 25))}`
      }));
      
      setUsers(usersWithNames);
      setFilteredUsers(usersWithNames);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        user =>
          (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getUsers();
    setIsRefreshing(false);
  };

  const openUserDetails = (user: User) => {
    setSelectedUser(user);
    setDetailsModalVisible(true);
  };

  const getInitials = (name: string): string => {
    if (!name) return 'AB';
    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      Alert.alert('Success', `User ${selectedUser.name} has been deleted`);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user. Please try again.');
    } finally {
      setConfirmModalVisible(false);
      setDetailsModalVisible(false);
    }
  };

  const handleToggleUserStatus = async () => {
    if (!selectedUser) return;

    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        return { ...user, status: newStatus };
      }
      return user;
    });

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    Alert.alert(
      'Success',
      `User ${selectedUser.name} has been ${selectedUser.status === 'active' ? 'deactivated' : 'activated'}`
    );
    setConfirmModalVisible(false);
    setDetailsModalVisible(false);
  };

  const showConfirmModal = (type: 'delete' | 'deactivate') => {
    setActionType(type);
    setConfirmModalVisible(true);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderProfileImage = (user: User) => {
    if (user.avatar) {
      return (
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
          onError={() => {
            // Fallback to initials if image fails to load
          }}
        />
      );
    }

    return (
      <View style={[styles.avatar, styles.avatarPlaceholder]}>
        <Text style={styles.avatarInitials}>{getInitials(user.name)}</Text>
      </View>
    );
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity style={styles.userCard} onPress={() => openUserDetails(item)}>
      <View style={styles.userCardContent}>
        <View style={styles.userCardLeft}>
          {renderProfileImage(item)}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name || 'Unknown User'}</Text>
            <Text style={styles.userEmail}>{item.email || 'No email'}</Text>
            <View style={styles.userMeta}>
              <View style={styles.metaItem}>
                <Icon name="calendar-alt" size={moderateScale(12)} color={colors.text.secondary} />
                <Text style={styles.metaText}>Joined {formatDate(item.joinDate)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.userCardRight}>
          <View style={[styles.statusBadge, {
            backgroundColor: item.status === 'active' ? colors.success + '20' : colors.danger + '20'
          }]}>
            <View style={[
              styles.statusDot,
              { backgroundColor: item.status === 'active' ? colors.success : colors.danger }
            ]} />
            <Text style={[styles.statusText, {
              color: item.status === 'active' ? colors.success : colors.danger
            }]}>
              {item.status}
            </Text>
          </View>

          <View style={styles.roleBadge}>
            <Icon
              name={item.role === 'admin' ? 'crown' : 'user'}
              size={moderateScale(10)}
              color={item.role === 'admin' ? colors.warning : colors.info}
            />
            <Text style={[styles.roleText, {
              color: item.role === 'admin' ? colors.warning : colors.info
            }]}>
              {item.role}
            </Text>
          </View>

          <Icon name="chevron-right" size={moderateScale(14)} color={colors.text.secondary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDetailsModal = () => (
    <Modal
      visible={detailsModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setDetailsModalVisible(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.detailsModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>User Details</Text>
            <TouchableOpacity onPress={() => setDetailsModalVisible(false)}>
              <Icon name="times" size={moderateScale(20)} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          {selectedUser && (
            <View style={styles.userDetailsContainer}>
              <View style={styles.userDetailHeader}>
                {renderProfileImage(selectedUser)}
                <View style={styles.userDetailInfo}>
                  <Text style={styles.detailName}>{selectedUser.name || 'Unknown User'}</Text>
                  <Text style={styles.detailEmail}>{selectedUser.email || 'No email'}</Text>
                  <View style={styles.detailBadges}>
                    <View style={[styles.detailBadge, {
                      backgroundColor: selectedUser.status === 'active' ? colors.success + '20' : colors.danger + '20'
                    }]}>
                      <View style={[
                        styles.statusDot,
                        { backgroundColor: selectedUser.status === 'active' ? colors.success : colors.danger }
                      ]} />
                      <Text style={[styles.detailStatus, {
                        color: selectedUser.status === 'active' ? colors.success : colors.danger
                      }]}>
                        {selectedUser.status}
                      </Text>
                    </View>

                    <View style={[styles.detailBadge, { backgroundColor: colors.background.secondary }]}>
                      <Icon
                        name={selectedUser.role === 'admin' ? 'crown' : 'user'}
                        size={moderateScale(12)}
                        color={selectedUser.role === 'admin' ? colors.warning : colors.info}
                      />
                      <Text style={[styles.detailStatus, {
                        color: selectedUser.role === 'admin' ? colors.warning : colors.info
                      }]}>
                        {selectedUser.role}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.userDetails}>
                <Text style={styles.sectionTitle}>Account Information</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>User ID:</Text>
                  <Text style={styles.detailValue}>{selectedUser.id}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Join Date:</Text>
                  <Text style={styles.detailValue}>{formatDate(selectedUser.joinDate)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Email:</Text>
                  <Text style={styles.detailValue}>{selectedUser.email || 'No email'}</Text>
                </View>
                {selectedUser.phone && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Phone:</Text>
                    <Text style={styles.detailValue}>{selectedUser.phone}</Text>
                  </View>
                )}
                {selectedUser.lastLogin && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Last Login:</Text>
                    <Text style={styles.detailValue}>{formatDate(selectedUser.lastLogin)}</Text>
                  </View>
                )}
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.secondaryButton]}
                  onPress={() => showConfirmModal('deactivate')}
                >
                  <Icon
                    name={selectedUser.status === 'active' ? 'user-slash' : 'user-check'}
                    size={moderateScale(14)}
                    color={selectedUser.status === 'active' ? colors.warning : colors.success}
                  />
                  <Text style={[styles.actionButtonText, {
                    color: selectedUser.status === 'active' ? colors.warning : colors.success
                  }]}>
                    {selectedUser.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.dangerButton]}
                  onPress={() => showConfirmModal('delete')}
                >
                  <Icon name="trash-alt" size={moderateScale(14)} color="#fff" />
                  <Text style={[styles.actionButtonText, { color: '#fff' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );

  const renderConfirmModal = () => (
    <Modal
      visible={confirmModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setConfirmModalVisible(false)}
    >
      <View style={styles.confirmModalContainer}>
        <View style={styles.confirmModal}>
          <View style={styles.confirmIconContainer}>
            <Icon
              name={actionType === 'delete' ? 'exclamation-triangle' : 'question-circle'}
              size={moderateScale(24)}
              color={actionType === 'delete' ? colors.danger : colors.warning}
            />
          </View>

          <Text style={styles.confirmTitle}>
            {actionType === 'delete'
              ? 'Delete User'
              : selectedUser?.status === 'active'
                ? 'Deactivate User'
                : 'Activate User'}
          </Text>

          <Text style={styles.confirmText}>
            {actionType === 'delete'
              ? `Are you sure you want to delete ${selectedUser?.name || 'this user'}? This action cannot be undone.`
              : selectedUser?.status === 'active'
                ? `Are you sure you want to deactivate ${selectedUser?.name || 'this user'}? They will not be able to login.`
                : `Are you sure you want to activate ${selectedUser?.name || 'this user'}? They will be able to login again.`}
          </Text>

          <View style={styles.confirmButtons}>
            <TouchableOpacity
              style={[styles.confirmButton, styles.cancelButton]}
              onPress={() => setConfirmModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmButton, styles.confirmActionButton, {
                backgroundColor: actionType === 'delete' ? colors.danger : colors.primary
              }]}
              onPress={actionType === 'delete' ? handleDeleteUser : handleToggleUserStatus}
            >
              <Text style={styles.confirmButtonText}>
                {actionType === 'delete'
                  ? 'Delete'
                  : selectedUser?.status === 'active'
                    ? 'Deactivate'
                    : 'Activate'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Users Management</Text>
        <Text style={styles.headerSubtitle}>{filteredUsers.length} users found</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={moderateScale(16)} color={colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users by name or email"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.text.placeholder}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="times-circle" size={moderateScale(16)} color={colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Icon name="users-slash" size={moderateScale(48)} color={colors.text.secondary} />
            </View>
            <Text style={styles.emptyText}>No users found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery ? 'Try adjusting your search' : 'Users will appear here when available'}
            </Text>
          </View>
        }
      />

      {renderDetailsModal()}
      {renderConfirmModal()}
    </SafeAreaView>
  );
}