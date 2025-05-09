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
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../../styles/Login.styles';
import { forgotPasswordRequest } from '../../controller/forgotPasswordController';

type AuthStackParamList = {
  ForgotPassword: undefined;
  ResetPassword: { emailOrUsername: string };
  Login: undefined;
};

type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
type ForgotPasswordScreenRouteProp = RouteProp<AuthStackParamList, 'ForgotPassword'>;

interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
  route: ForgotPasswordScreenRouteProp;
}

interface FormErrors {
  emailOrUsername: string;
}

interface PopupState {
  visible: boolean;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [emailOrUsername, setEmailOrUsername] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({ emailOrUsername: '' });
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
    let newErrors = { emailOrUsername: '' };
    let isValid = true;

    if (!emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or username is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleForgotPassword = async (): Promise<void> => {
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      const result = await forgotPasswordRequest(emailOrUsername);
      
      if (result.success) {
        showPopup(result.message, 'success');
        setTimeout(() => {
          navigation.navigate('ResetPassword', { emailOrUsername });
        }, 3000);
      } else {
        showPopup(result.message, 'error');
      }
    } catch (error) {
      showPopup('An unexpected error occurred.', 'error');
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
              <Text style={styles.welcomeText}>Forgot Password</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={{ textAlign: 'center', marginBottom: 20, color: '#666' }}>
                Enter your email or username and we'll send you a code to reset your password.
              </Text>
              
              <View style={[styles.inputContainer, errors.emailOrUsername && { borderColor: 'red' }]}>
                <Icon name="user" size={18} color="#666" style={styles.inputIcon} />
                <TextInput
                  placeholder="Email or Username"
                  value={emailOrUsername}
                  onChangeText={(text) => {
                    setEmailOrUsername(text);
                    if (errors.emailOrUsername) {
                      setErrors({ ...errors, emailOrUsername: '' });
                    }
                  }}
                  style={styles.input}
                  autoCapitalize="none"
                  placeholderTextColor="#999"
                  returnKeyType="send"
                  onSubmitEditing={handleForgotPassword}
                />
              </View>
              {errors.emailOrUsername ? (
                <Text style={styles.error}>{errors.emailOrUsername}</Text>
              ) : null}

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  isLoading && { opacity: 0.7 }
                ]}
                onPress={handleForgotPassword}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Sending...' : 'Send Reset Code'}
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
};

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

export default ForgotPasswordScreen;