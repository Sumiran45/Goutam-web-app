import { useState } from 'react';
import api from '../Api/api';
import { Alert } from 'react-native';

interface OnboardingData {
  firstName: string;
  lastName: string;
  age: string;
  weight: string;
  height: string;
  lastPeriodDate: string;
  cycleLength: string;
  periodLength: string;
  symptoms: string[];
  goals: string[];
}

export const useRegister = (navigation: any, setIsLoading: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
  }>({});

  const handleUsernameChange = (text: string) => setUsername(text);
  const handleEmailChange = (text: string) => setEmail(text);
  const handlePasswordChange = (text: string) => setPassword(text);
  const handleConfirmPasswordChange = (text: string) => setConfirmPassword(text);
  const handlePhoneNumberChange = (text: string) => setPhoneNumber(text);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Minimum 6 characters';
    if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';

    // Phone validation if phone number is provided
    if (phoneNumber && !/^\+?[\d\s\-\(\)]+$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (onboardingData?: OnboardingData) => {
    if (!validate()) {
      setIsLoading(false);
      return { success: false };
    }

    try {
      const requestBody: any = {
        username,
        email,
        password,
        confirm_password: confirmPassword,
      };

      if (phoneNumber.trim()) {
        requestBody.phone = phoneNumber.trim();
      }

      if (onboardingData) {
        requestBody.onboarding_data = {
          firstName: onboardingData.firstName || '',
          lastName: onboardingData.lastName || '',
          age: onboardingData.age || '',
          weight: onboardingData.weight || '',
          height: onboardingData.height || '',
          lastPeriodDate: onboardingData.lastPeriodDate || '',
          cycleLength: onboardingData.cycleLength || '28',
          periodLength: onboardingData.periodLength || '5',
          symptoms: onboardingData.symptoms || [],
          goals: onboardingData.goals || []
        };
      }

      const res = await api.post('/register', requestBody);

      if (res.status === 200 || res.status === 201) {
        Alert.alert('Success', 'Account created successfully. Please check your email for verification code.');
        return { success: true, data: res.data, userId: res.data?.user?.id || res.data?.id };
      } else {
        return { success: false };
      }
    } catch (err: any) {
      console.error('Registration error:', err.response?.data);

      let message = 'Registration failed';

      if (err.response?.status === 422) {
        const detail = err.response?.data?.detail;
        if (Array.isArray(detail)) {
          message = detail.map((error: any) => `${error.loc.join('.')}: ${error.msg}`).join('\n');
        } else if (typeof detail === 'string') {
          message = detail;
        }
      } else if (err.response?.status === 409) {
        message = 'User with this username, email, or phone already exists';
      } else {
        message = err.response?.data?.detail || err.message || 'Registration failed';
      }

      Alert.alert('Error', message);
      return { success: false };
    }
  };

  // New function to verify email
  const verifyEmail = async (email: string, code: string) => {
    try {
      const res = await api.post('/verify-email', {
        email: email,
        code: code
      });

      if (res.status === 200) {
        return { success: true, data: res.data };
      } else {
        return { success: false };
      }
    } catch (err: any) {
      console.error('Email verification error:', err.response?.data);

      let message = 'Email verification failed';
      if (err.response?.data?.detail) {
        message = err.response.data.detail;
      }

      Alert.alert('Error', message);
      return { success: false };
    }
  };

  // New function to verify phone
  const verifyPhone = async (phone: string, code: string) => {
    try {
      const res = await api.post('/verify-phone', {
        phone: phone,
        code: code
      });

      if (res.status === 200) {
        return { success: true, data: res.data };
      } else {
        return { success: false };
      }
    } catch (err: any) {
      console.error('Phone verification error:', err.response?.data);

      let message = 'Phone verification failed';
      if (err.response?.data?.detail) {
        message = err.response.data.detail;
      }

      Alert.alert('Error', message);
      return { success: false };
    }
  };

  // New function to resend verification code
  const resendVerificationCode = async (email?: string, phone?: string) => {
    try {
      const requestBody: any = {};
      
      if (email) {
        requestBody.email = email;
      }
      if (phone) {
        requestBody.phone = phone;
      }

      const res = await api.post('/resend-verification', requestBody);

      if (res.status === 200) {
        return { success: true, data: res.data };
      } else {
        return { success: false };
      }
    } catch (err: any) {
      console.error('Resend verification error:', err.response?.data);

      let message = 'Failed to resend verification code';
      if (err.response?.data?.detail) {
        message = err.response.data.detail;
      }

      Alert.alert('Error', message);
      return { success: false };
    }
  };

  const updateOnboardingData = async (userId: string, onboardingData: OnboardingData) => {
    console.log("🚀 ~ updateOnboardingData ~ userId:", userId);
    try {
      const requestBody = {
        firstName: onboardingData.firstName || '',
        lastName: onboardingData.lastName || '',
        age: onboardingData.age || '',
        weight: onboardingData.weight || '',
        height: onboardingData.height || '',
        lastPeriodDate: onboardingData.lastPeriodDate || '',
        cycleLength: onboardingData.cycleLength || '28',
        periodLength: onboardingData.periodLength || '5',
        symptoms: onboardingData.symptoms || [],
        goals: onboardingData.goals || []
      };

      const res = await api.put(`/users/${userId}/onboarding`, requestBody);

      if (res.status === 200) {
        return { success: true, data: res.data };
      } else {
        return { success: false };
      }
    } catch (err: any) {
      console.error('Onboarding update error:', err.response?.data);

      let message = 'Failed to update profile information';

      if (err.response?.data?.detail) {
        message = err.response.data.detail;
      }

      Alert.alert('Error', message);
      return { success: false };
    }
  };

  return {
    username,
    email,
    password,
    confirmPassword,
    phoneNumber,
    showPassword,
    showConfirmPassword,
    errors,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handlePhoneNumberChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleRegister,
    verifyEmail,
    verifyPhone,
    resendVerificationCode,
    updateOnboardingData,
  };
};