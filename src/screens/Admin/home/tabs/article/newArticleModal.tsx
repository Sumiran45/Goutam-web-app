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
  const [youtubeUrl, setYoutubeUrl] = useState('');

  // Function to validate YouTube URL
  const validateYouTubeUrl = (url: string) => {
    if (!url.trim()) return true; // Empty URL is valid (optional field)
    
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  // Function to extract YouTube video ID
  const extractYouTubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Title and content are required');
      return;
    }

    // Validate YouTube URL if provided
    if (youtubeUrl.trim() && !validateYouTubeUrl(youtubeUrl)) {
      Alert.alert('Error', 'Please enter a valid YouTube URL');
      return;
    }
  
    try {
      // Include YouTube URL in the article data if provided
      const articleData = {
        title: title.trim(),
        content: content.trim(),
        ...(youtubeUrl.trim() && { videoUrl: youtubeUrl.trim() })
      };
      
      const newArticle = await addArticle(articleData.title, articleData.content, articleData.videoUrl); 
      onSave(newArticle); 
      
      // Reset form
      setTitle('');
      setContent('');
      setYoutubeUrl('');
      onClose();
    } catch (error) {
      console.error('Failed to create article:', error);
      Alert.alert('Error', 'Failed to publish article. Please try again.');
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setTitle('');
    setContent('');
    setYoutubeUrl('');
    onClose();
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create New Article</Text>
            <TouchableOpacity onPress={handleClose}>
              <Icon name="times" size={moderateScale(20)} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <Text style={styles.inputLabel}>Title *</Text>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter article title"
              placeholderTextColor={colors.text.placeholder}
            />
            
            <Text style={styles.inputLabel}>Content *</Text>
            <TextInput
              style={[styles.textInput, styles.contentInput]}
              value={content}
              onChangeText={setContent}
              placeholder="Write your article content here..."
              placeholderTextColor={colors.text.placeholder}
              multiline
              textAlignVertical="top"
            />

            <View style={styles.youtubeSection}>
              <View style={styles.youtubeLabelContainer}>
                <Icon name="youtube" size={moderateScale(16)} color={colors.error} />
                <Text style={[styles.inputLabel, styles.youtubeLabel]}>YouTube Video (Optional)</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={youtubeUrl}
                onChangeText={setYoutubeUrl}
                placeholder="https://www.youtube.com/watch?v=..."
                placeholderTextColor={colors.text.placeholder}
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {youtubeUrl.trim() && !validateYouTubeUrl(youtubeUrl) && (
                <View style={styles.errorContainer}>
                  <Icon name="exclamation-triangle" size={moderateScale(12)} color={colors.error} />
                  <Text style={styles.errorText}>Please enter a valid YouTube URL</Text>
                </View>
              )}
              {youtubeUrl.trim() && validateYouTubeUrl(youtubeUrl) && extractYouTubeId(youtubeUrl) && (
                <View style={styles.successContainer}>
                  <Icon name="check-circle" size={moderateScale(12)} color={colors.success || colors.primary} />
                  <Text style={styles.successText}>Valid YouTube URL detected</Text>
                </View>
              )}
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.saveButton, 
                (!title.trim() || !content.trim() || (youtubeUrl.trim() && !validateYouTubeUrl(youtubeUrl))) 
                  && styles.saveButtonDisabled
              ]} 
              onPress={handleSave}
              disabled={!title.trim() || !content.trim() || (youtubeUrl.trim() && !validateYouTubeUrl(youtubeUrl))}
            >
              <Text style={styles.saveButtonText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewArticleModal;