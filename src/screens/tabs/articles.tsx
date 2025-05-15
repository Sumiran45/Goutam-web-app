import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/articles.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../controller/RootStackParamList';
import { Article, fetchArticles, addArticle } from '../../controller/Articles.controller';

export const ArticlesScreen = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [userArticles, setUserArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleContent, setNewArticleContent] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');

  type ArticlesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ArticleDetail'>;
  const navigation = useNavigation<ArticlesScreenNavigationProp>();

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await fetchArticles();
      setArticles(data);
      
      // Load user's articles
      // const userData = await fetchUserArticles();
      // setUserArticles(userData);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to fetch articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleAddArticle = async () => {
    if (newArticleTitle.trim() === '' || newArticleContent.trim() === '') {
      Alert.alert('Validation', 'Title and content are required.');
      return;
    }

    try {
      const newArticle = await addArticle(newArticleTitle, newArticleContent);
      setArticles(prev => [newArticle, ...prev]);
      setUserArticles(prev => [newArticle, ...prev]);
      setNewArticleTitle('');
      setNewArticleContent('');
      setShowAddForm(false);
    } catch (err) {
      const error = err as any;
      console.error(err);
      Alert.alert('Error', error.response?.data?.detail || 'Failed to publish article.');
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => navigation.navigate('ArticleDetail', { article: item })}
    >
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleAuthor}>By {item.author}</Text>
      <Text style={styles.articleDate}>{formatDate(item.date)}</Text>
      <Text style={styles.articleSummary}>{item.summary}</Text>
      
      <View style={styles.articleActions}>
        <Text style={styles.readMore}>Read more →</Text>
        
        {activeTab === 'mine' && (
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={(e) => {
              e.stopPropagation();
              Alert.alert(
                'Delete Article',
                'Are you sure you want to delete this article?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: () => {
                      // Handle delete logic here
                      setUserArticles(prev => prev.filter(article => article.id !== item.id));
                      setArticles(prev => prev.filter(article => article.id !== item.id));
                      Alert.alert('Success', 'Article deleted successfully');
                    }
                  }
                ]
              );
            }}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ARTICLES</Text>
      </View>

      {showAddForm ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Article Title"
            value={newArticleTitle}
            onChangeText={setNewArticleTitle}
          />
          <TextInput
            style={styles.contentInput}
            placeholder="Write your thoughts here..."
            value={newArticleContent}
            onChangeText={setNewArticleContent}
            multiline
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => setShowAddForm(false)}
            >
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.publishButton]}
              onPress={handleAddArticle}
            >
              <Text style={styles.actionButtonText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'all' && styles.activeTab]}
              onPress={() => setActiveTab('all')}
            >
              <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All Articles</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'mine' && styles.activeTab]}
              onPress={() => setActiveTab('mine')}
            >
              <Text style={[styles.tabText, activeTab === 'mine' && styles.activeTabText]}>My Articles</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3498db" />
              <Text style={styles.loadingText}>Loading articles...</Text>
            </View>
          ) : (
            <FlatList
              data={activeTab === 'all' ? articles : userArticles}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={[styles.listContainer, { paddingBottom: 80 }]} // Add padding at bottom for the fixed button
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    {activeTab === 'all' ? 'No articles available' : 'You haven\'t published any articles yet'}
                  </Text>
                </View>
              }
            />
          )}

          {/* Fixed "Write New Article" button at the bottom */}
          <TouchableOpacity 
            style={styles.fixedAddButton} 
            onPress={() => setShowAddForm(true)}
          >
            <Text style={styles.addButtonText}>Write New Article</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};