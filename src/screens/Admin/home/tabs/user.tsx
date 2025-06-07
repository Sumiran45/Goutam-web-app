import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, moderateScale } from '../../../../styles/admin/theme';
import { styles } from '../../../../styles/admin/admin.style';

interface AddUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ visible, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    phoneNumber: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors = {
      email: '',
      username: '',
      phoneNumber: ''
    };
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
      isValid = false;
    }

    // Phone number validation
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      const newUser = {
        id: Date.now().toString(),
        email: formData.email.trim(),
        username: formData.username.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      
      onSave(newUser);
      handleClose();
      
      Alert.alert(
        'Success',
        'User has been added successfully!',
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const handleClose = () => {
    setFormData({
      email: '',
      username: '',
      phoneNumber: ''
    });
    setErrors({
      email: '',
      username: '',
      phoneNumber: ''
    });
    setFocusedField(null);
    onClose();
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const getInputContainerStyle = (field: string) => {
    return [
      styles.userModalInputContainer,
      errors[field as keyof typeof errors] ? styles.userModalInputError : null,
      focusedField === field ? styles.userModalInputFocused : null
    ];
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.userModalOverlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.userModalKeyboardContainer}
        >
          <View style={styles.userModalContent}>
            {/* Enhanced Header */}
            <View style={styles.userModalHeader}>
              <View style={styles.userModalHeaderLeft}>
                <View style={styles.userModalHeaderIcon}>
                  <Icon name="user-plus" size={moderateScale(20)} color={colors.primary} />
                </View>
                <View>
                  <Text style={styles.userModalTitle}>Add New User</Text>
                  <Text style={styles.userModalSubtitle}>Create a new user account</Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleClose} style={styles.userModalCloseButton}>
                <Icon name="times" size={moderateScale(18)} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.userModalBody} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.userModalScrollContent}
            >
              {/* Email Field */}
              <View style={styles.userModalInputGroup}>
                <Text style={styles.userModalInputLabel}>
                  Email Address 
                  <Text style={styles.userModalRequiredAsterisk}> *</Text>
                </Text>
                <View style={getInputContainerStyle('email')}>
                  <View style={styles.userModalInputIconContainer}>
                    <Icon name="envelope" size={moderateScale(16)} color={colors.primary} />
                  </View>
                  <TextInput
                    style={styles.userModalTextInput}
                    placeholder="Enter email address"
                    placeholderTextColor={colors.text.placeholder}
                    value={formData.email}
                    onChangeText={(text) => updateFormData('email', text)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    selectionColor={colors.primary}
                    style={[
                      styles.userModalTextInput,
                      {
                        borderWidth: 0,
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        outlineWidth: 0,
                      }
                    ]}
                  />
                </View>
                {errors.email ? (
                  <View style={styles.userModalErrorContainer}>
                    <Icon name="exclamation-triangle" size={moderateScale(12)} color={colors.error} />
                    <Text style={styles.userModalErrorText}>{errors.email}</Text>
                  </View>
                ) : null}
              </View>

              {/* Username Field */}
              <View style={styles.userModalInputGroup}>
                <Text style={styles.userModalInputLabel}>
                  Username 
                  <Text style={styles.userModalRequiredAsterisk}> *</Text>
                </Text>
                <View style={getInputContainerStyle('username')}>
                  <View style={styles.userModalInputIconContainer}>
                    <Icon name="user" size={moderateScale(16)} color={colors.primary} />
                  </View>
                  <TextInput
                    style={[
                      styles.userModalTextInput,
                      {
                        borderWidth: 0,
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        outlineWidth: 0,
                      }
                    ]}
                    placeholder="Enter username"
                    placeholderTextColor={colors.text.placeholder}
                    value={formData.username}
                    onChangeText={(text) => updateFormData('username', text)}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    selectionColor={colors.primary}
                  />
                </View>
                {errors.username ? (
                  <View style={styles.userModalErrorContainer}>
                    <Icon name="exclamation-triangle" size={moderateScale(12)} color={colors.error} />
                    <Text style={styles.userModalErrorText}>{errors.username}</Text>
                  </View>
                ) : null}
              </View>

              {/* Phone Number Field */}
              <View style={styles.userModalInputGroup}>
                <Text style={styles.userModalInputLabel}>
                  Phone Number 
                  <Text style={styles.userModalRequiredAsterisk}> *</Text>
                </Text>
                <View style={getInputContainerStyle('phoneNumber')}>
                  <View style={styles.userModalInputIconContainer}>
                    <Icon name="phone" size={moderateScale(16)} color={colors.primary} />
                  </View>
                  <TextInput
                    style={[
                      styles.userModalTextInput,
                      {
                        borderWidth: 0,
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        outlineWidth: 0,
                      }
                    ]}
                    placeholder="Enter phone number"
                    placeholderTextColor={colors.text.placeholder}
                    value={formData.phoneNumber}
                    onChangeText={(text) => updateFormData('phoneNumber', text)}
                    onFocus={() => setFocusedField('phoneNumber')}
                    onBlur={() => setFocusedField(null)}
                    keyboardType="phone-pad"
                    underlineColorAndroid="transparent"
                    selectionColor={colors.primary}
                  />
                </View>
                {errors.phoneNumber ? (
                  <View style={styles.userModalErrorContainer}>
                    <Icon name="exclamation-triangle" size={moderateScale(12)} color={colors.error} />
                    <Text style={styles.userModalErrorText}>{errors.phoneNumber}</Text>
                  </View>
                ) : null}
              </View>

              {/* Info Card */}
              <View style={styles.userModalInfoCard}>
                <Icon name="info-circle" size={moderateScale(16)} color={colors.info} />
                <Text style={styles.userModalInfoText}>
                  The new user will receive an email with login instructions.
                </Text>
              </View>
            </ScrollView>

            {/* Enhanced Footer */}
            <View style={styles.userModalFooter}>
              <TouchableOpacity 
                style={styles.userModalButtonSecondary} 
                onPress={handleClose}
              >
                <Text style={styles.userModalButtonSecondaryText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.userModalButtonPrimary} 
                onPress={handleSave}
              >
                <Icon name="user-plus" size={moderateScale(16)} color={colors.white} />
                <Text style={styles.userModalButtonPrimaryText}>Add User</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default AddUserModal;