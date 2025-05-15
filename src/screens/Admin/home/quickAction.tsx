import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, moderateScale } from '../../../styles/admin/theme';
import { styles } from '../../../styles/admin/admin.style';

const QuickActions = () => {
  const actions = [
    { icon: 'user-plus', label: 'Add User', color: colors.primary },
    { icon: 'file-upload', label: 'New Article', color: colors.secondary },
    { icon: 'plus-circle', label: 'Add Product', color: colors.warning },
    { icon: 'cog', label: 'Settings', color: colors.info },
  ];

  return (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {actions.map((action, index) => (
          <TouchableOpacity key={index} style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
              <Icon name={action.icon} size={moderateScale(18)} color={action.color} />
            </View>
            <Text style={styles.quickActionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuickActions;