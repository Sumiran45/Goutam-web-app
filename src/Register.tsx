import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  KeyboardAvoidingView, Platform, ScrollView, StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRegister } from './controller/Register.controller';
import { styles } from './styles/Register.style';

export default function RegisterScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    username, email, password, confirmPassword,
    showPassword, showConfirmPassword,
    errors,
    handleUsernameChange, handleEmailChange,
    handlePasswordChange, handleConfirmPasswordChange,
    togglePasswordVisibility, toggleConfirmPasswordVisibility,
    handleRegister,
  } = useRegister(navigation, setIsLoading);

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/bear.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.welcomeText}>Create Account</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Register</Text>

            {/* Username */}
            <View style={styles.inputContainer}>
              <Icon name="user" size={18} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={handleUsernameChange}
                style={styles.input}
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>
            {errors.username && <Text style={styles.error}>{errors.username}</Text>}

            {/* Email */}
            <View style={styles.inputContainer}>
              <Icon name="envelope" size={18} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#999"
              />
            </View>
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            {/* Password */}
            <View style={styles.inputContainer}>
              <Icon name="lock" size={18} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!showPassword}
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#666" />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Icon name="lock" size={18} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
                <Icon name={showConfirmPassword ? 'eye-slash' : 'eye'} size={20} color="#666" />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

            <TouchableOpacity style={[styles.registerButton]}
              onPress={() => {
                if (!isLoading) {
                  setIsLoading(true);
                  handleRegister();
                }
              }} activeOpacity={0.8} disabled={isLoading}>
              <Text style={styles.registerButtonText}>{isLoading ? 'REGISTERING...' : 'REGISTER'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}