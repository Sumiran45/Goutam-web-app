import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Linking,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, moderateScale } from '../../../../../styles/admin/theme';
import styles from '../../../../../styles/admin/articleDetail.style';

const ArticleDetailModal = ({ visible, onClose, article, onUpdate, onDelete }:any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedVideoUrl, setEditedVideoUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (article) {
      setEditedTitle(article.title || '');
      setEditedContent(article.content || '');
      setEditedVideoUrl(article.videoUrl || '');
    }
  }, [article]);

  if (!article) return null;
  
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const extractYouTubeId = (url:any) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const getYouTubeThumbnail = (videoId:any) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const getTestVideoUrl = () => {
    const testVideos = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=9bZkp7q19f0',
      'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
      'https://youtu.be/WZPY3xVedQc',
    ];
    return testVideos[Math.floor(Math.random() * testVideos.length)];
  };

  const openVideo = async (videoUrl:any) => {
    try {
      const supported = await Linking.canOpenURL(videoUrl);
      if (supported) {
        await Linking.openURL(videoUrl);
      } else {
        Alert.alert(
          'Cannot Open Video',
          'Unable to open the video. Please check if you have a compatible app installed.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while trying to open the video.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSaveUpdate = async () => {
    if (!editedTitle.trim()) {
      Alert.alert('Error', 'Please enter a title for the article.');
      return;
    }
    
    if (!editedContent.trim()) {
      Alert.alert('Error', 'Please enter content for the article.');
      return;
    }

    try {
      setIsSaving(true);
      const updatedArticle = {
        ...article,
        title: editedTitle.trim(),
        content: editedContent.trim(),
        videoUrl: editedVideoUrl.trim(),
      };

      if (onUpdate) {
        await onUpdate(updatedArticle);
        setIsEditing(false);
        Alert.alert('Success', 'Article updated successfully!');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      Alert.alert('Error', 'Failed to update article. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(article.title || '');
    setEditedContent(article.content || '');
    setEditedVideoUrl(article.videoUrl || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Article',
      'Are you sure you want to delete this article? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            if (onDelete) onDelete(article.id);
          }
        }
      ]
    );
  };

  const videoUrl = (isEditing ? editedVideoUrl : article.videoUrl) || getTestVideoUrl();
  const videoId = extractYouTubeId(videoUrl);
  const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : null;

  const VideoSection = () => {
    const showVideo = true;

    if (!showVideo) return null;

    return (
      <View style={styles.videoSection}>
        <View style={styles.videoSectionHeader}>
          <Icon name="youtube" size={moderateScale(16)} color={colors.error} />
          <Text style={styles.videoSectionTitle}>Featured Video</Text>
        </View>

        {isEditing ? (
          <View style={styles.videoEditContainer}>
            <TextInput
              style={styles.videoUrlInput}
              placeholder="YouTube URL (optional)"
              placeholderTextColor={colors.text.placeholder}
              value={editedVideoUrl}
              onChangeText={setEditedVideoUrl}
              multiline={false}
            />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.videoThumbnailContainer}
            onPress={() => openVideo(videoUrl)}
            activeOpacity={0.8}
          >
            <View style={styles.videoThumbnail}>
              {thumbnailUrl ? (
                <Image
                  source={{ uri: thumbnailUrl }}
                  style={styles.videoThumbnailImage}
                  resizeMode="cover"
                  onError={() => console.log('Failed to load thumbnail')}
                />
              ) : (
                <View style={styles.videoThumbnailFallback}>
                  <Icon name="youtube" size={moderateScale(32)} color={colors.error} />
                </View>
              )}
              <View style={styles.videoThumbnailOverlay}>
                <View style={styles.playButton}>
                  <Icon name="play" size={moderateScale(20)} color="#fff" />
                </View>
              </View>
            </View>

            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>Watch Video</Text>
              <Text style={styles.videoSubtitle}>Tap to open in your video app</Text>
              {!article.videoUrl && (
                <Text style={styles.testVideoLabel}>(Test Video)</Text>
              )}
            </View>
          </TouchableOpacity>
        )}

        <Text style={styles.videoDescription}>
          {isEditing ? 'Enter a YouTube URL for the article video' : 'Tap above to watch the video for additional insights on this topic.'}
        </Text>
      </View>
    );
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
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Icon name="arrow-left" size={moderateScale(16)} color={colors.text.primary} />
            </TouchableOpacity>
            <View style={styles.headerActions}>
              {!isEditing && (
                <TouchableOpacity 
                  onPress={() => setIsEditing(true)} 
                  style={styles.editButton}
                >
                  <Icon name="edit" size={moderateScale(16)} color={colors.primary} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <ScrollView style={styles.modalBody}>
            {isEditing ? (
              <TextInput
                style={styles.titleInput}
                placeholder="Article Title"
                placeholderTextColor={colors.text.placeholder}
                value={editedTitle}
                onChangeText={setEditedTitle}
                multiline={true}
              />
            ) : (
              <Text style={styles.articleTitle}>{article.title}</Text>
            )}
            
            <View style={styles.authorContainer}>
              <View style={styles.authorAvatar}>
                <Text style={styles.authorInitial}>{article.author.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.authorName}>{article.author}</Text>
                <Text style={styles.articleDate}>{formattedDate}</Text>
              </View>
            </View>

            <VideoSection />
            
            <View style={styles.contentSection}>
              <View style={styles.contentSectionHeader}>
                <Icon name="file-alt" size={moderateScale(16)} color={colors.text.secondary} />
                <Text style={styles.contentSectionTitle}>Article Content</Text>
              </View>
              
              {isEditing ? (
                <TextInput
                  style={styles.contentInput}
                  placeholder="Article Content"
                  placeholderTextColor={colors.text.placeholder}
                  value={editedContent}
                  onChangeText={setEditedContent}
                  multiline={true}
                  textAlignVertical="top"
                />
              ) : (
                <Text style={styles.articleContent}>{article.content}</Text>
              )}
            </View>

            <View style={styles.bottomSpacer} />
          </ScrollView>

          {/* Action Buttons Footer */}
          <View style={styles.modalFooter}>
            {isEditing ? (
              <>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelEdit}
                  disabled={isSaving}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.saveButton, isSaving && styles.disabledButton]}
                  onPress={handleSaveUpdate}
                  disabled={isSaving}
                >
                  <Text style={styles.saveButtonText}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.deleteButton]}
                  onPress={handleDelete}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ArticleDetailModal;