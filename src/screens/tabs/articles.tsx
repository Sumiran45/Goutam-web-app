import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, Alert, ActivityIndicator, Modal } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/articles.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../controller/RootStackParamList';
import { Article, fetchArticles, addArticle } from '../../controller/Articles.controller';
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

export const ArticlesScreen = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [userArticles, setUserArticles] = useState<Article[]>([]);
  const [otherArticles, setOtherArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleContent, setNewArticleContent] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  type ArticlesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ArticleDetail'>;
  const navigation = useNavigation<ArticlesScreenNavigationProp>();

  const loadData = async () => {
    try {
      setLoading(true);
      
      const userProfile = await getProfile();
      setCurrentUser(userProfile);
      
      const allArticles = await fetchArticles();
      setArticles(allArticles);
      
      // Filter articles created by the logged-in user
      const myArticles = allArticles.filter(article => article.author === userProfile.name);
      setUserArticles(myArticles);
      
      // Filter articles NOT created by the logged-in user
      const others = allArticles.filter(article => article.author !== userProfile.name);
      setOtherArticles(allArticles);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );
  const handleAddArticle = async () => {
    if (newArticleTitle.trim() === '' || newArticleContent.trim() === '') {
      Alert.alert('Validation', 'Title and content are required.');
      return;
    }

    try {
      console.log("Handle article called")
      const newArticle = await addArticle(newArticleTitle, newArticleContent);
      console.log("returnd from api call")
     loadData();
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

  const handleDeleteConfirmation = (articleId: string) => {
    setArticleToDelete(articleId);
    setShowDeleteModal(true);
  };

  const handleDeleteArticle = () => {
    if (articleToDelete) {
      // Handle delete logic here
      setUserArticles(prev => prev.filter(article => article.id !== articleToDelete));
      setArticles(prev => prev.filter(article => article.id !== articleToDelete));
      setOtherArticles(prev => prev.filter(article => article.id !== articleToDelete));
      setShowDeleteModal(false);
      setArticleToDelete(null);
      Alert.alert('Success', 'Article deleted successfully');
    }
  };

  const renderItem = ({ item }: { item: Article }) => {
    const isMyArticle = currentUser && item.author === currentUser.name;
    const showDeleteButton = isMyArticle && activeTab === 'mine';
    
    return (
      <TouchableOpacity
        style={styles.articleCard}
        onPress={() => navigation.navigate('ArticleDetail', { 
          article: item,
          currentUser: currentUser 
        })}
      >
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleAuthor}>By {item.author}</Text>
        <Text style={styles.articleDate}>{formatDate(item.date)}</Text>
        <Text style={styles.articleSummary}>{item.summary}</Text>
        
        <View style={styles.articleActions}>
          <Text style={styles.readMore}>Read more →</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
              data={activeTab === 'all' ? otherArticles : userArticles}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={[styles.listContainer, { paddingBottom: 80 }]} 
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