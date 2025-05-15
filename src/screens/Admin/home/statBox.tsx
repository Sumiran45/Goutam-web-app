import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StatBoxProps } from '../../../types/type';
import { moderateScale } from '../../../styles/admin/theme';
import { globalStyles } from '../../../styles/admin/global';

const StatBox: React.FC<StatBoxProps> = ({ label, value, icon, color }) => (
  <View style={[styles.statBox, globalStyles.cardShadow]}>
    <View style={styles.statBoxHeader}>
      <View style={[styles.iconCircle, { backgroundColor: `${color}20` }]}>
        <Icon name={icon} size={moderateScale(16)} color={color} />
      </View>
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  statBox: {
    flex: 1,
    minWidth: moderateScale(100),
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    margin: moderateScale(4),
  },
  statBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },
  iconCircle: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: '#888',
    marginTop: moderateScale(4),
  },
  statValue: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#333',
  },
});

export default StatBox;