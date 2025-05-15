import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/editProfile.styles';
import { getProfile, updateProfile } from '../controller/User.controller';

interface User {
  _id: string | null;
  name: string | null;
  email: string | null;
  username: string | null;
  profilePicture?: string | null;
}

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState<string | null>('https://marketplace.canva.com/EAF21qlw744/1/0/1600w/canva-blue-modern-facebook-profile-picture-mtu4sNVuKIU.jpg');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const userData = await getProfile();
        setUser(userData);
        setName(userData.name || '');
        setEmail(userData.email || '');
        setUsername(userData.username || '');
        setImage(userData.profilePicture || null);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const updateProfileFunc = async () => {
    setLoading(true);
    
    const data = { name };  // Send the name in the JSON body
    
    // Only add image if it's available
    // if (image) {
    //   data.image = image;
    // }
    
    try {
      const updatedUser = await updateProfile(data);  // Send JSON data
      setUser(updatedUser);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      const err = error as any;
      console.error('Profile update failed:', err.response || err.message);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword' as never);
  };

  const handleImagePress = () => {
    if (!uploading) {
      pickImage();
    }
  };

  if (loading && !user) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.placeholderView} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileImageContainer}>
            {uploading ? (
              <View style={styles.imageContainer}>
                <ActivityIndicator size="large" color="#3498db" />
              </View>
            ) : (
              <TouchableOpacity onPress={() => {}} style={styles.imageContainer}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Ionicons name="person" size={60} color="#ccc" />
                  </View>
                )}
                {isEditingImage && (
                  <View style={styles.editIconContainer}>
                    <Ionicons name="camera" size={20} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity 
              style={styles.passwordButton}
              onPress={navigateToChangePassword}
            >
              <Text style={styles.passwordButtonText}>Change Password</Text>
              <Ionicons name="chevron-forward" size={20} color="#3498db" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={updateProfileFunc}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
