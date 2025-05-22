import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, moderateScale } from '../../../../../styles/admin/theme';
import styles from '../../../../../styles/admin/article.style';
import { addArticle } from '../../../../../controller/Articles.controller';

const NewArticleModal = ({ visible, onClose, onSave }:any) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Title and content are required');
      return;
    }
  
    try {
      const newArticle = await addArticle(title, content); // Call API
      onSave(newArticle); // Pass to parent to update list
      setTitle('');
      setContent('');
      onClose();
    } catch (error) {
      console.error('Failed to create article:', error);
      Alert.alert('Error', 'Failed to publish article. Please try again.');
    }
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create New Article</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="times" size={moderateScale(20)} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter article title"
              placeholderTextColor={colors.text.placeholder}
            />
            
            <Text style={styles.inputLabel}>Content</Text>
            <TextInput
              style={[styles.textInput, styles.contentInput]}
              value={content}
              onChangeText={setContent}
              placeholder="Write your article content here..."
              placeholderTextColor={colors.text.placeholder}
              multiline
              textAlignVertical="top"
            />
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewArticleModal;