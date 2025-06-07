import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const scale = (size: number): number => (width / 375) * size;
export const verticalScale = (size: number): number => (height / 812) * size;
export const moderateScale = (size: number, factor = 0.5): number => size + (scale(size) - size) * factor;

export const colors = {
  primary: '#6200EE',
  primaryDark: '#3700B3',
  secondary: '#03A9F4',
  accent: '#03DAC6',
  warning: '#FF9800',
  danger: '#FF5252',
  success: '#4CAF50',
  info: '#2196F3',
  error: '#FF5252',
  text: {
    primary: '#333',
    secondary: '#666',
    light: '#888',
    white: '#fff',
    placeholder: '#999',
  },
  background: {
    primary: '#f6f8fa',
    secondary: '#fff',
    overlay: 'rgba(0, 0, 0, 0.5)',
    
  },
   border: {
    light: '#eee',
    medium: '#f0f0f0',
     input: '#e0e0e0',
  },
};

export const typography = {
  header: {
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  body: {
    fontSize: moderateScale(14),
  },
  caption: {
    fontSize: moderateScale(12),
  },
};

export const spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
};
