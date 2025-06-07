import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, moderateScale } from '../../../styles/admin/theme';
import { styles } from '../../../styles/admin/admin.style';
import NewArticleModal from './tabs/article/newArticleModal'; 
import AddUserModal from './tabs/user'; 

const QuickActions = ({ 
  onArticleAdded, 
  onUserAdded 
}: { 
  onArticleAdded?: (article: any) => void;
  onUserAdded?: (user: any) => void;
}) => {
  const [isNewArticleModalVisible, setIsNewArticleModalVisible] = useState(false);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);

  const handleNewArticlePress = () => {
    setIsNewArticleModalVisible(true);
  };

  const handleAddUserPress = () => {
    setIsAddUserModalVisible(true);
  };

  const handleArticleModalClose = () => {
    setIsNewArticleModalVisible(false);
  };

  const handleUserModalClose = () => {
    setIsAddUserModalVisible(false);
  };

  const handleArticleSave = (newArticle: any) => {
    if (onArticleAdded) {
      onArticleAdded(newArticle);
    }
    setIsNewArticleModalVisible(false);
  };

  const handleUserSave = (newUser: any) => {
    if (onUserAdded) {
      onUserAdded(newUser);
    }
    setIsAddUserModalVisible(false);
  };

  const actions = [
    { 
      icon: 'user-plus', 
      label: 'Add User', 
      color: colors.primary,
      onPress: handleAddUserPress
    },
    { 
      icon: 'file-upload', 
      label: 'New Article', 
      color: colors.secondary,
      onPress: handleNewArticlePress
    },
    { 
      icon: 'plus-circle', 
      label: 'Add Product', 
      color: colors.warning,
      onPress: () => {
        console.log('Add Product pressed');
      }
    },
    { 
      icon: 'cog', 
      label: 'Settings', 
      color: colors.info,
      onPress: () => {
        console.log('Settings pressed');
      }
    },
  ];

  return (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {actions.map((action, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.quickActionButton}
            onPress={action.onPress}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
              <Icon name={action.icon} size={moderateScale(18)} color={action.color} />
            </View>
            <Text style={styles.quickActionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* New Article Modal */}
      <NewArticleModal
        visible={isNewArticleModalVisible}
        onClose={handleArticleModalClose}
        onSave={handleArticleSave}
      />
      
      {/* Add User Modal */}
      <AddUserModal
        visible={isAddUserModalVisible}
        onClose={handleUserModalClose}
        onSave={handleUserSave}
      />
    </View>
  );
};

export default QuickActions;