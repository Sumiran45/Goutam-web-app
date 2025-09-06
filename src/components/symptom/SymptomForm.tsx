import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Button } from 'react-native-paper';
import { useSymptomContext } from '../../Context/SymptomContext';
import { SymptomFormData, initialSymptomForm } from '../../types/symptom.types';
import { symptomFormStyles as styles } from '../../styles/SymptomForm.styles';

type SymptomFormProps = {
  initialData?: SymptomFormData | undefined;
  onSubmit: (data: SymptomFormData) => Promise<void>;
  onCancel?: () => void;
  isEditing?: boolean;
};

const moodOptions = [
  { label: 'Select Mood', value: undefined },
  { label: '😊 Happy', value: 'happy' },
  { label: '😢 Sad', value: 'sad' },
  { label: '😠 Irritated', value: 'irritated' },
  { label: '😰 Anxious', value: 'anxious' },
  { label: '😌 Calm', value: 'calm' },
  { label: '🤩 Excited', value: 'excited' },
  { label: '😔 Depressed', value: 'depressed' },
];

const crampOptions = [
  { label: 'No Cramps', value: 'none' },
  { label: 'Mild', value: 'mild' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Strong', value: 'strong' },
];

const flowOptions = [
  { label: 'No Flow', value: 'none' },
  { label: 'Light', value: 'light' },
  { label: 'Medium', value: 'medium' },
  { label: 'Heavy', value: 'heavy' },
];

const sleepOptions = [
  { label: 'Poor', value: 'poor' },
  { label: 'Fair', value: 'fair' },
  { label: 'Good', value: 'good' },
  { label: 'Excellent', value: 'excellent' },
];

export const SymptomForm: React.FC<SymptomFormProps> = ({
  initialData = initialSymptomForm,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<SymptomFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loading } = useSymptomContext();

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (field: keyof SymptomFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggle = (field: keyof SymptomFormData) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Failed to save symptoms. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !isEditing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3182ce" />
        <Text style={{ marginTop: 16, color: '#4a5568', fontSize: 16 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Update Your Entry' : 'How are you feeling today?'}
          </Text>
          <Text style={styles.headerSubtitle}>
            Track your symptoms and mood
          </Text>
        </View>

        {/* Mood Card */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>😊 Mood</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.mood}
              onValueChange={(value: any) => handleChange('mood', value)}
              style={styles.picker}
              dropdownIconColor="#3182ce"
            >
              {moodOptions.map((option) => (
                <Picker.Item
                  key={option.value || 'none'}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Physical Symptoms Card */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>🩸 Physical Symptoms</Text>
          
          {/* Cramps */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Cramps</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.cramps || 'none'}
                onValueChange={(value: any) => handleChange('cramps', value === 'none' ? null : value)}
                style={styles.picker}
              >
                {crampOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Flow Level */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Flow Level</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.flow_level || 'none'}
                onValueChange={(value: any) => handleChange('flow_level', value === 'none' ? null : value)}
                style={styles.picker}
              >
                {flowOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Other Symptoms Toggle */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Other Symptoms</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  formData.headache && styles.toggleButtonActive,
                ]}
                onPress={() => handleToggle('headache')}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.toggleText,
                  formData.headache && styles.toggleTextActive,
                ]}>
                  🤕 Headache
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  formData.nausea && styles.toggleButtonActive,
                ]}
                onPress={() => handleToggle('nausea')}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.toggleText,
                  formData.nausea && styles.toggleTextActive,
                ]}>
                  🤢 Nausea
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  formData.fatigue && styles.toggleButtonActive,
                ]}
                onPress={() => handleToggle('fatigue')}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.toggleText,
                  formData.fatigue && styles.toggleTextActive,
                ]}>
                  😴 Fatigue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Lifestyle Card */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>🌙 Lifestyle</Text>
          
          {/* Sleep Quality */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Sleep Quality</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.sleep_quality || 'good'}
                onValueChange={(value: any) => handleChange('sleep_quality', value)}
                style={styles.picker}
              >
                {sleepOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Food Cravings */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Food Cravings</Text>
            <TextInput
              mode="outlined"
              placeholder="What are you craving today?"
              value={formData.food_cravings || ''}
              onChangeText={(text: any) => handleChange('food_cravings', text)}
              style={styles.textInput}
              outlineColor="#e2e8f0"
              activeOutlineColor="#3182ce"
            />
          </View>
        </View>

        {/* Notes Card */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>📝 Notes</Text>
          <TextInput
            style={[styles.textInput, styles.textInputMultiline]}
            multiline
            numberOfLines={4}
            placeholder="Add any additional notes about how you're feeling today..."
            value={formData.notes || ''}
            onChangeText={(text: any) => handleChange('notes', text)}
            mode="outlined"
            outlineColor="#e2e8f0"
            activeOutlineColor="#3182ce"
          />
        </View>
      </ScrollView>

      {/* Fixed Bottom Button Container */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <Button
            mode="outlined"
            onPress={onCancel}
            style={styles.cancelButton}
            labelStyle={styles.cancelButtonText}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled
            ]}
            labelStyle={styles.buttonText}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator size="small" color="#ffffff" />
                <Text style={[styles.buttonText, { marginLeft: 8 }]}>
                  {isEditing ? 'Updating...' : 'Saving...'}
                </Text>
              </View>
            ) : (
              isEditing ? 'Update Entry' : 'Save Entry'
            )}
          </Button>
        </View>
      </View>

      {/* Global Loading Overlay */}
      {isSubmitting && (
        <View style={styles.submitLoadingOverlay}>
          <ActivityIndicator size="large" color="#3182ce" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};
