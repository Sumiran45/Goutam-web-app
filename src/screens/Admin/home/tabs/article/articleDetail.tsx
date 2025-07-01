import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Linking,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, moderateScale } from '../../../../../styles/admin/theme';
import styles from '../../../../../styles/admin/articleDetail.style';

const ArticleDetailModal = ({ visible, onClose, article }:any) => {
  if (!article) return null;
  
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Hardcoded video URLs for testing
  const getTestVideoUrl = () => {
    const testVideos = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Roll
      'https://www.youtube.com/watch?v=9bZkp7q19f0', // Gangnam Style
      'https://www.youtube.com/watch?v=kJQP7kiw5Fk', // Despacito
      'https://youtu.be/WZPY3xVedQc', // Your hardcoded URL
    ];
    return testVideos[Math.floor(Math.random() * testVideos.length)];
  };

  const openVideo = async (videoUrl: string) => {
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

  const videoUrl = article.videoUrl || getTestVideoUrl();
  const videoId = extractYouTubeId(videoUrl);
  const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : null;

  const VideoSection = () => {
    const showVideo = true; // Change this to article.videoUrl to restore original behavior

    if (!showVideo) return null;

    return (
      <View style={styles.videoSection}>
        <View style={styles.videoSectionHeader}>
          <Icon name="youtube" size={moderateScale(16)} color={colors.error} />
          <Text style={styles.videoSectionTitle}>Featured Video</Text>
        </View>

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
              // Fallback gradient background if thumbnail fails
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

        <Text style={styles.videoDescription}>
          Tap above to watch the video for additional insights on this topic.
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
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Icon name="heart" size={moderateScale(12)} color={colors.text.light} solid />
                <Text style={styles.statText}>{article.likes}</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="comment-alt" size={moderateScale(12)} color={colors.text.light} solid />
                <Text style={styles.statText}>{article.comments}</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="youtube" size={moderateScale(12)} color={colors.error} />
                <Text style={styles.statText}>Video</Text>
              </View>
            </View>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <Text style={styles.articleTitle}>{article.title}</Text>
            
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
              <Text style={styles.articleContent}>{article.content}</Text>
            </View>

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ArticleDetailModal;