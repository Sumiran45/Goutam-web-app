import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/articles.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../controller/RootStackParamList';
import { Article, fetchArticles } from '../../controller/Articles.controller';
import { getProfile } from '../../controller/User.controller';

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  image: string | null;
  is_active: boolean;
  purchased_products: string[];
  articles: string[];
}

// Assuming Article interface already has videoUrl property
// If not, you may need to update the Article interface in your controller
interface EnhancedArticle extends Article {
  videoUrl?: string;
}

export const ArticlesScreen = () => {
  const [articles, setArticles] = useState<EnhancedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  type ArticlesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ArticleDetail'>;
  const navigation = useNavigation<ArticlesScreenNavigationProp>();

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const loadData = async () => {
    try {
      setLoading(true);

      const userProfile = await getProfile();
      setCurrentUser(userProfile);

      const allArticles = await fetchArticles();

      const enhancedArticles = allArticles.map((article: any) => ({
        ...article,
        videoUrl: article.videoUrl || article.video_url || article.video || null
      }));

      setArticles(enhancedArticles);

    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to fetch articles.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderItem = ({ item }: { item: EnhancedArticle }) => {
    const videoId = item.videoUrl ? extractYouTubeId(item.videoUrl) : null;
    const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : null;

    return (
      <TouchableOpacity
        style={styles.articleCard}
        onPress={() => navigation.navigate('ArticleDetail', {
          article: item,
          currentUser: currentUser
        })}
        activeOpacity={0.8}
      >
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleAuthor}>By {item.author}</Text>
        <Text style={styles.articleDate}>{formatDate(item.date)}</Text>

        {videoId && thumbnailUrl && (
          <View style={styles.videoPreviewContainer}>
            <View style={styles.videoThumbnail}>
              <Image
                source={{ uri: thumbnailUrl }}
                style={styles.thumbnailImage}
                resizeMode="cover"
                onError={() => {
                  console.log('Thumbnail failed to load for video:', videoId);
                }}
              />
              <View style={styles.playButtonOverlay}>
                <View style={styles.playButton}>
                  <Text style={styles.playButtonText}>▶</Text>
                </View>
              </View>
            </View>
            <Text style={styles.videoLabel}>📺 Video Content Available</Text>
          </View>
        )}

        <Text style={styles.articleSummary}>{item.summary}</Text>

        <View style={styles.articleActions}>
          <Text style={styles.readMore}>Read more →</Text>
          {item.videoUrl && (
            <Text style={styles.watchVideo}>Watch Video 🎥</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ARTICLES & VIDEOS</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Loading articles...</Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No articles available</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};