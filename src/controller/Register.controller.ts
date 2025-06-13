// import { useState } from 'react';
// import api from '../Api/api';
// import { Alert } from 'react-native';

// export const useRegister = (navigation: any, setIsLoading: any) => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; confirmPassword?: string }>({});

//   const handleUsernameChange = (text: string) => setUsername(text);
//   const handleEmailChange = (text: string) => setEmail(text);
//   const handlePasswordChange = (text: string) => setPassword(text);
//   const handleConfirmPasswordChange = (text: string) => setConfirmPassword(text);

//   const togglePasswordVisibility = () => setShowPassword(prev => !prev);
//   const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!username) newErrors.username = 'Username is required';
//     if (!email) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
//     if (!password) newErrors.password = 'Password is required';
//     else if (password.length < 6) newErrors.password = 'Minimum 6 characters';
//     if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleRegister = async () => {
//     if (!validate()) {
//       setIsLoading(false);
//       return { success: false };
//     }

//     try {
//       const res = await api.post('/register', {
//         username,
//         email,
//         password,
//       });

//       if (res.status === 200 || res.status === 201) {
//         Alert.alert('Success', 'Account created successfully');
//         // Return success instead of navigating to Login
//         return { success: true };
//       } else {
//         return { success: false };
//       }
//     } catch (err: any) {
//       const message = err.response?.data?.detail || 'Registration failed';
//       Alert.alert('Error', message);
//       return { success: false };
//     }
//   };

//   return {
//     username,
//     email,
//     password,
//     confirmPassword,
//     showPassword,
//     showConfirmPassword,
//     errors,
//     handleUsernameChange,
//     handleEmailChange,
//     handlePasswordChange,
//     handleConfirmPasswordChange,
//     togglePasswordVisibility,
//     toggleConfirmPasswordVisibility,
//     handleRegister,
//   };
// };

import { useState } from 'react';
import api from '../Api/api';
import { Alert } from 'react-native';

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

  const handleRegister = async () => {
    if (!validate()) {
      setIsLoading(false);
      return { success: false };
    }

    try {
      // Prepare the request body according to backend expectations
      const requestBody: any = {
        username,
        email,
        password,
        confirm_password: confirmPassword, // Backend expects 'confirm_password', not 'confirmPassword'
      };

      // Add phone if provided
      if (phoneNumber.trim()) {
        requestBody.phone = phoneNumber.trim();
      }

      const res = await api.post('/register', requestBody);

      if (res.status === 200 || res.status === 201) {
        Alert.alert('Success', 'Account created successfully. Please check your email for verification code.');
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err: any) {
      console.error('Registration error:', err.response?.data);
      
      let message = 'Registration failed';
      
      if (err.response?.status === 422) {
        // Handle validation errors
        const detail = err.response?.data?.detail;
        if (Array.isArray(detail)) {
          // FastAPI validation errors
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
  };
};