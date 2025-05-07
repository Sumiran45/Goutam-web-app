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

export default function ForgotPasswordScreen({ navigation }: any) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [errors, setErrors] = useState({ emailOrUsername: '' });
  const [popupMessage, setPopupMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);

  const showPopup = (message: string) => {
    setPopupMessage(message);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000);
  };

  const handleForgotPassword = async () => {
    let newErrors = { emailOrUsername: '' };
    let isValid = true;

    if (!emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or username is required';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    try {
      const response = await api.post('/forgot-password', {
        email_or_username: emailOrUsername,
      });
      showPopup(response.data.message);
      setTimeout(() => navigation.navigate('ResetPassword', { emailOrUsername }), 3000);
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
            <Text style={styles.welcomeText}>Forgot Password</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={[styles.inputContainer, errors.emailOrUsername && { borderColor: 'red' }]}>
              <Icon name="user" size={18} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Email or Username"
                value={emailOrUsername}
                onChangeText={setEmailOrUsername}
                style={styles.input}
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>
            {errors.emailOrUsername ? (
              <Text style={styles.error}>{errors.emailOrUsername}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleForgotPassword}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Send Reset Code</Text>
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
