import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Animated,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/Login.styles';
import axios from 'axios';
import api from '../../Api/api';

interface FormErrors {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

interface PopupState {
  visible: boolean;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export default function ResetPasswordScreen({ navigation, route }: any) {
  const { emailOrUsername } = route.params;
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({ code: '', newPassword: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popup, setPopup] = useState<PopupState>({
    visible: false,
    message: '',
    type: 'info',
  });

  const popupAnim = useRef(new Animated.Value(0)).current;
  const popupTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (popup.visible) {
      if (popupTimeout.current) {
        clearTimeout(popupTimeout.current);
      }

      Animated.timing(popupAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      popupTimeout.current = setTimeout(() => {
        hidePopup();
      }, 3000);
    } else {
      Animated.timing(popupAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (popupTimeout.current) {
        clearTimeout(popupTimeout.current);
      }
    };
  }, [popup.visible]);

  const showPopup = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info'): void => {
    setPopup({ visible: true, message, type });
  };

  const hidePopup = (): void => {
    setPopup((prev) => ({ ...prev, visible: false }));
  };

  const validate = (): boolean => {
    let newErrors = { code: '', newPassword: '', confirmPassword: '' };
    let isValid = true;

    if (!code.trim()) {
      newErrors.code = 'Reset code is required';
      isValid = false;
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleResetPassword = async (): Promise<void> => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await api.post('/reset-password', {
        email_or_username: emailOrUsername,
        code,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      showPopup(response.data.message, 'success');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        showPopup(error.response.data.detail, 'error');
      } else {
        showPopup('An unexpected error occurred.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const getPopupColor = () => {
    switch (popup.type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'warning':
        return '#FF9800';
      default:
        return '#2196F3';
    }
  };

  const getPopupIcon = () => {
    switch (popup.type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'exclamation-circle';
      case 'warning':
        return 'exclamation-triangle';
      default:
        return 'info-circle';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.logoContainer}>
              <Text style={styles.welcomeText}>Reset Password</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={{ textAlign: 'center', marginBottom: 20, color: '#666' }}>
                Enter the reset code sent to your email and create a new password.
              </Text>

              <View style={[styles.inputContainer, errors.code && { borderColor: 'red' }]}>
                <Icon name="key" size={18} color="#666" style={styles.inputIcon} />
                <TextInput
                  placeholder="Reset Code"
                  value={code}
                  onChangeText={(text) => {
                    setCode(text);
                    if (errors.code) {
                      setErrors({ ...errors, code: '' });
                    }
                  }}
                  style={styles.input}
                  placeholderTextColor="#999"
                />
              </View>
              {errors.code ? <Text style={styles.error}>{errors.code}</Text> : null}

              <View style={[styles.inputContainer, errors.newPassword && { borderColor: 'red' }]}>
                <Icon name="lock" size={18} color="#666" style={styles.inputIcon} />
                <TextInput
                  placeholder="New Password"
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                    if (errors.newPassword) {
                      setErrors({ ...errors, newPassword: '' });
                    }
                  }}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#666" />
                </TouchableOpacity>
              </View>
              {errors.newPassword ? <Text style={styles.error}>{errors.newPassword}</Text> : null}

              <View style={[styles.inputContainer, errors.confirmPassword && { borderColor: 'red' }]}>
                <Icon name="lock" size={18} color="#666" style={styles.inputIcon} />
                <TextInput
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword) {
                      setErrors({ ...errors, confirmPassword: '' });
                    }
                  }}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#666" />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  isLoading && { opacity: 0.7 }
                ]}
                onPress={handleResetPassword}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Text>
              </TouchableOpacity>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Remember your password? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.registerLink}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Custom Popup */}
        {popup.visible && (
          <Animated.View
            style={[
              popupStyles.popupContainer,
              {
                backgroundColor: getPopupColor(),
                opacity: popupAnim,
                transform: [{
                  translateY: popupAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0],
                  })
                }]
              }
            ]}
          >
            <Icon name={getPopupIcon()} size={22} color="#fff" style={popupStyles.icon} />
            <Text style={popupStyles.message}>{popup.message}</Text>
            <TouchableOpacity onPress={hidePopup} style={popupStyles.closeButton}>
              <Icon name="times" size={18} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}

const popupStyles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  icon: {
    marginRight: 10,
  },
  message: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    padding: 5,
  }
});