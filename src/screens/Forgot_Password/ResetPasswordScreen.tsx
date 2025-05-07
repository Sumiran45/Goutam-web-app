import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/Login.styles'; // Reuse login styles
import axios from 'axios';
import api from '../../Api/api';

const { width, height } = Dimensions.get('window');

export default function ResetPasswordScreen({ navigation, route }: any) {
  const { emailOrUsername } = route.params;
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ code: '', newPassword: '', confirmPassword: '' });
  const [popupMessage, setPopupMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);

  const showPopup = (message: string) => {
    setPopupMessage(message);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000);
  };

  const handleResetPassword = async () => {
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
    if (!isValid) return;

    try {
      const response = await api.post('/reset-password', {
        email_or_username: emailOrUsername,
        code,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      showPopup(response.data.message);
      setTimeout(() => navigation.navigate('Login'), 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        showPopup(error.response.data.detail);
      } else {
        showPopup('An unexpected error occurred.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.welcomeText}>Reset Password</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={[styles.inputContainer, errors.code && { borderColor: 'red' }]}>
              <Icon name="key" size={18} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Reset Code"
                value={code}
                onChangeText={setCode}
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
                onChangeText={setNewPassword}
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
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
                placeholderTextColor="#999"
              />
            </View>
            {errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleResetPassword}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={popupVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPopupVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000077' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, maxWidth: '80%' }}>
            <Text style={{ fontSize: 16, color: 'black', textAlign: 'center' }}>{popupMessage}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}