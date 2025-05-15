import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavItemProps } from '../../../types/type';
import { colors, moderateScale } from '../../../styles/admin/theme';

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onPress }) => (
    <TouchableOpacity
        style={[styles.navItem, isActive && styles.activeNavItem]}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <Icon name={icon} size={moderateScale(16)} color={colors.text.white} style={styles.icon} />
        <Text style={styles.navText}>{label}</Text>
        {isActive && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(16),
        borderRadius: moderateScale(8),
        marginBottom: moderateScale(4),
        position: 'relative',
    },
    activeNavItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    icon: {
        width: moderateScale(20),
    },
    navText: {
        color: colors.text.white,
        marginLeft: moderateScale(12),
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    activeIndicator: {
        position: 'absolute',
        left: 0,
        top: '20%',
        height: '60%',
        width: moderateScale(3),
        backgroundColor: colors.text.white,
        borderRadius: moderateScale(4),
    },
});

export default NavItem;