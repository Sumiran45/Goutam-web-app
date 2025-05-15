import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../../../../../styles/admin/article.style';

const FilterButton = ({ title, active, onPress }:any) => {
  return (
    <TouchableOpacity 
      style={[styles.filterButton, active && styles.filterButtonActive]} 
      onPress={onPress}
    >
      <Text style={[styles.filterButtonText, active && styles.filterButtonTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterButton;