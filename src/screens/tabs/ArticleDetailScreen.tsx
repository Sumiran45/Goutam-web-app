import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Linking,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/articlesDetail.styles';

const { width } = Dimensions.get('window');

export const ArticleDetailScreen = ({ route }: any) => {
  const { article, currentUser } = route.params;
  const navigation = useNavigation();

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://youtu.be/PeL_XtBrOxw?si=xYhvi61tHrVEESKb`;
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const videoId = article.videoUrl ? extractYouTubeId(article.videoUrl) : null;
  const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : null;

  const VideoSection = () => {
    if (!article.videoUrl) return null;

    return (
      <View style={styles.videoSection}>
        <Text style={styles.videoSectionTitle}>📺 Featured Video</Text>

        <TouchableOpacity
          style={styles.videoThumbnailContainer}
          onPress={() => openVideo(article.videoUrl)}
          activeOpacity={0.8}
        >
          {thumbnailUrl && (
            <View style={styles.videoThumbnail}>
              <View style={styles.videoThumbnailOverlay}>
                <View style={styles.playButton}>
                  <Text style={styles.playButtonText}>▶</Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>Watch Video</Text>
            <Text style={styles.videoSubtitle}>Tap to open in your video app</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.videoDescription}>
          Tap above to watch the video for additional insights on this topic.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ARTICLE</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{article.title}</Text>

          <View style={styles.metaContainer}>
            <Text style={styles.author}>By {article.author}</Text>
            <Text style={styles.date}>{formatDate(article.date)}</Text>
          </View>

          <VideoSection />

          <View style={styles.contentSection}>
            <Text style={styles.contentSectionTitle}>📝 Article Content</Text>
            <Text style={styles.content}>{article.content}</Text>
          </View>

          <View style={styles.additionalInfoSection}>
            <Text style={styles.additionalInfoTitle}>About this Article</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Published:</Text>
              <Text style={styles.infoValue}>{formatDate(article.date)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Author:</Text>
              <Text style={styles.infoValue}>{article.author}</Text>
            </View>
            {article.videoUrl && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Video:</Text>
                <Text style={styles.infoValue}>Available</Text>
              </View>
            )}
          </View>

          <View style={styles.spacer} />
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.bottomBackButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.bottomBackButtonText}>Return to Articles</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};