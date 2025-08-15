import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Button } from 'react-native-paper';
import { useSymptomContext } from '../../Context/SymptomContext';
import { SymptomFormData, initialSymptomForm } from '../../types/symptom.types';
import { styles } from '../../styles/Home.styles';

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
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.modalContainer}>
      <Text style={styles.sectionTitle}>How are you feeling today?</Text>
      
      {/* Mood */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Mood</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.mood}
            onValueChange={(value:any) => handleChange('mood', value)}
            style={styles.picker}
            dropdownIconColor="#3498db"
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

      {/* Cramps */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Cramps</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.cramps || 'none'}
            onValueChange={(value:any) => handleChange('cramps', value === 'none' ? null : value)}
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
            onValueChange={(value:any) => handleChange('flow_level', value === 'none' ? null : value)}
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

      {/* Sleep Quality */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Sleep Quality</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.sleep_quality || 'good'}
            onValueChange={(value:any) => handleChange('sleep_quality', value)}
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

      {/* Toggle Symptoms */}
      <View style={styles.toggleGroup}>
        <Text style={styles.label}>Symptoms</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.headache && styles.toggleButtonActive,
            ]}
            onPress={() => handleToggle('headache')}
          >
            <Text style={styles.toggleText}>Headache</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.nausea && styles.toggleButtonActive,
            ]}
            onPress={() => handleToggle('nausea')}
          >
            <Text style={styles.toggleText}>Nausea</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.fatigue && styles.toggleButtonActive,
            ]}
            onPress={() => handleToggle('fatigue')}
          >
            <Text style={styles.toggleText}>Fatigue</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Food Cravings */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Food Cravings</Text>
        <TextInput
          mode="outlined"
          placeholder="What are you craving today?"
          value={formData.food_cravings || ''}
          onChangeText={(text:any) => handleChange('food_cravings', text)}
          style={styles.textInput}
        />
      </View>

      {/* Notes */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          placeholder="Add any additional notes..."
          value={formData.notes || ''}
          onChangeText={(text:any) => handleChange('notes', text)}
          mode="outlined"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={onCancel}
          style={styles.cancelButton}
          labelStyle={styles.cancelButtonText}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          labelStyle={styles.buttonText}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isEditing ? 'Update' : 'Save'}
        </Button>
      </View>
      {isSubmitting && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      )}
    </ScrollView>
  );
};
