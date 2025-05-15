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
  Dimensions,
  RefreshControl,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, moderateScale } from '../../../../styles/admin/theme';
import { styles } from '../../../../styles/admin/userScreen.style';


// Mocked data - would be replaced with API calls in production
const MOCK_USERS = Array(15).fill(null).map((_, index) => ({
  id: `user-${index + 1}`,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  avatar: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`,
  joinDate: new Date(2024, 0, index + 1).toLocaleDateString(),
  articles: Math.floor(Math.random() * 20),
  purchases: Math.floor(Math.random() * 15),
  status: index % 7 === 0 ? 'inactive' : 'active',
  role: index % 10 === 0 ? 'admin' : 'user',
}));

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  articles: number;
  purchases: number;
  status: 'active' | 'inactive';
  role: 'admin' | 'user';
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
  const [sortBy, setSortBy] = useState<'name' | 'articles' | 'purchases' | 'date' | 'status'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch users data
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const fetchUsers = () => {
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setUsers(MOCK_USERS);
      setFilteredUsers(MOCK_USERS);
      setIsLoading(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchUsers();
    setIsRefreshing(false);
  };

  const openUserDetails = (user: User) => {
    setSelectedUser(user);
    setDetailsModalVisible(true);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    // In a real app, you would make an API call to delete the user
    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    Alert.alert('Success', `User ${selectedUser.name} has been deleted`);
    setConfirmModalVisible(false);
    setDetailsModalVisible(false);
  };

  const handleToggleUserStatus = () => {
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

  const handleSort = (key: typeof sortBy) => {
    let order: 'asc' | 'desc' = 'asc';
    if (sortBy === key) {
      order = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(order);
    } else {
      setSortBy(key);
      setSortOrder('asc');
      order = 'asc';
    }

    const sorted = [...filteredUsers].sort((a, b) => {
      if (key === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (key === 'date') {
        return order === 'asc'
          ? new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
          : new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      } else if (key === 'articles') {
        return order === 'asc' ? a.articles - b.articles : b.articles - a.articles;
      } else if (key === 'purchases') {
        return order === 'asc' ? a.purchases - b.purchases : b.purchases - a.purchases;
      } else if (key === 'status') {
        return order === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });

    setFilteredUsers(sorted);
  };

  const renderSortIcon = (key: typeof sortBy) => {
    if (sortBy !== key) return null;
    return (
      <Icon
        name={sortOrder === 'asc' ? 'sort-up' : 'sort-down'}
        size={moderateScale(12)}
        color={colors.text.primary}
        style={styles.sortIcon}
      />
    );
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity style={styles.userCard} onPress={() => openUserDetails(item)}>
      <View style={styles.userCardHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          <View style={styles.userMeta}>
            <View style={styles.metaItem}>
              <Icon name="calendar-alt" size={moderateScale(12)} color={colors.text.secondary} />
              <Text style={styles.metaText}>{item.joinDate}</Text>
            </View>
            <View style={styles.statusBadge}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: item.status === 'active' ? colors.success : colors.danger },
                ]}
              />
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.userCardBody}>
        <View style={styles.statsItem}>
          <Icon name="file-alt" size={moderateScale(14)} color={colors.primary} />
          <Text style={styles.statsValue}>{item.articles}</Text>
          <Text style={styles.statsLabel}>Articles</Text>
        </View>
        <View style={styles.statsItem}>
          <Icon name="shopping-cart" size={moderateScale(14)} color={colors.accent} />
          <Text style={styles.statsValue}>{item.purchases}</Text>
          <Text style={styles.statsLabel}>Purchases</Text>
        </View>
        <View style={styles.statsItem}>
          <Icon name="user-tag" size={moderateScale(14)} color={colors.info} />
          <Text style={styles.statsValue}>{item.role}</Text>
          <Text style={styles.statsLabel}>Role</Text>
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
              <Icon name="times" size={moderateScale(18)} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          {selectedUser && (
            <View style={styles.userDetailsContainer}>
              <View style={styles.userDetailHeader}>
                <Image source={{ uri: selectedUser.avatar }} style={styles.detailAvatar} />
                <View style={styles.userDetailInfo}>
                  <Text style={styles.detailName}>{selectedUser.name}</Text>
                  <Text style={styles.detailEmail}>{selectedUser.email}</Text>
                  <View style={styles.detailBadge}>
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor:
                            selectedUser.status === 'active' ? colors.success : colors.danger,
                        },
                      ]}
                    />
                    <Text style={styles.detailStatus}>{selectedUser.status}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.userStatsContainer}>
                <Text style={styles.sectionTitle}>User Statistics</Text>
                <View style={styles.statsRow}>
                  <View style={styles.statCard}>
                    <Icon name="file-alt" size={moderateScale(24)} color={colors.primary} />
                    <Text style={styles.statValue}>{selectedUser.articles}</Text>
                    <Text style={styles.statLabel}>Articles</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Icon name="shopping-cart" size={moderateScale(24)} color={colors.accent} />
                    <Text style={styles.statValue}>{selectedUser.purchases}</Text>
                    <Text style={styles.statLabel}>Purchases</Text>
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
                  <Text style={styles.detailValue}>{selectedUser.joinDate}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Role:</Text>
                  <Text style={styles.detailValue}>{selectedUser.role}</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: selectedUser.status === 'active' ? colors.warning : colors.success },
                  ]}
                  onPress={() => showConfirmModal('deactivate')}
                >
                  <Icon
                    name={selectedUser.status === 'active' ? 'user-slash' : 'user-check'}
                    size={moderateScale(14)}
                    color="#fff"
                  />
                  <Text style={styles.actionButtonText}>
                    {selectedUser.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: colors.danger }]}
                  onPress={() => showConfirmModal('delete')}
                >
                  <Icon name="trash-alt" size={moderateScale(14)} color="#fff" />
                  <Text style={styles.actionButtonText}>Delete</Text>
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
          <Text style={styles.confirmTitle}>
            {actionType === 'delete'
              ? 'Delete User'
              : selectedUser?.status === 'active'
              ? 'Deactivate User'
              : 'Activate User'}
          </Text>
          <Text style={styles.confirmText}>
            {actionType === 'delete'
              ? `Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`
              : selectedUser?.status === 'active'
              ? `Are you sure you want to deactivate ${selectedUser?.name}? They will not be able to login.`
              : `Are you sure you want to activate ${selectedUser?.name}? They will be able to login again.`}
          </Text>
          <View style={styles.confirmButtons}>
            <TouchableOpacity
              style={[styles.confirmButton, styles.cancelButton]}
              onPress={() => setConfirmModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                {
                  backgroundColor:
                    actionType === 'delete'
                      ? colors.danger
                      : selectedUser?.status === 'active'
                      ? colors.warning
                      : colors.success,
                },
              ]}
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

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity style={styles.sortButton} onPress={() => handleSort('name')}>
          <Text
            style={[
              styles.sortButtonText,
              sortBy === 'name' && { color: colors.primary, fontWeight: 'bold' },
            ]}
          >
            Name
          </Text>
          {renderSortIcon('name')}
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={() => handleSort('articles')}>
          <Text
            style={[
              styles.sortButtonText,
              sortBy === 'articles' && { color: colors.primary, fontWeight: 'bold' },
            ]}
          >
            Articles
          </Text>
          {renderSortIcon('articles')}
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={() => handleSort('purchases')}>
          <Text
            style={[
              styles.sortButtonText,
              sortBy === 'purchases' && { color: colors.primary, fontWeight: 'bold' },
            ]}
          >
            Purchases
          </Text>
          {renderSortIcon('purchases')}
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={() => handleSort('status')}>
          <Text
            style={[
              styles.sortButtonText,
              sortBy === 'status' && { color: colors.primary, fontWeight: 'bold' },
            ]}
          >
            Status
          </Text>
          {renderSortIcon('status')}
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={[colors.primary]} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="users-slash" size={moderateScale(48)} color={colors.text.secondary} />
            <Text style={styles.emptyText}>No users found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search</Text>
          </View>
        }
      />

      {renderDetailsModal()}
      {renderConfirmModal()}
    </SafeAreaView>
  );
}
