import { useState } from 'react';
import api from '../Api/api';
import { Alert } from 'react-native';

export const useRegister = (navigation: any, setIsLoading: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; confirmPassword?: string }>({});

  const handleUsernameChange = (text: string) => setUsername(text);
  const handleEmailChange = (text: string) => setEmail(text);
  const handlePasswordChange = (text: string) => setPassword(text);
  const handleConfirmPasswordChange = (text: string) => setConfirmPassword(text);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
      setIsLoading(false);
      return { success: false };
    }

    try {
      const res = await api.post('/register', {
        username,
        email,
        password,
      });

      if (res.status === 200 || res.status === 201) {
        Alert.alert('Success', 'Account created successfully');
        // Return success instead of navigating to Login
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Registration failed';
      Alert.alert('Error', message);
      return { success: false };
    }
  };

  return {
    username,
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    errors,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleRegister,
  };
};