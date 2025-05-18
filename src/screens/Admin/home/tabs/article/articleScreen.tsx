import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import ArticleItem from './articleItem';
import FilterButton from './filterButton';
import NewArticleModal from './newArticleModal';
import ArticleDetailModal from './articleDetail';

// Import styles
import { globalStyles } from '../../../../../styles/admin/global';
import { colors, moderateScale } from '../../../../../styles/admin/theme';
import styles from '../../../../../styles/admin/article.style';
import { mockArticles } from '../../../../../types/type';
import { fetchArticles } from '../../../../../controller/Articles.controller';
import { deleteArrticle } from '../../../../../Api/AdminDasboard.api';

const ArticlesScreen = ({ navigation }:any) => {
  const [articles, setArticles] = useState<any[]>([]);;
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);;
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchArticles();
        setArticles(data);
        setFilteredArticles(data);
        
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Failed to fetch articles.');
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    loadArticles();
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  

  useEffect(() => {
    filterArticles(activeFilter, searchQuery);
  }, [articles, activeFilter, searchQuery]);

  const filterArticles = (filter:any, query = '') => {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;
    const oneYear = 365 * oneDay;
    
    let filtered = [...articles];
    
    if (filter !== 'all') {
      filtered = filtered.filter(article => {
        const articleDate = new Date(article.date);
        const diffTime = now.getTime() - articleDate.getTime();
        
        switch (filter) {
          case 'today':
            return diffTime < oneDay;
          case 'week':
            return diffTime < oneWeek;
          case 'month':
            return diffTime < oneMonth;
          case 'year':
            return diffTime < oneYear;
          default:
            return true;
        }
      });
    }
    
    if (query.trim() !== '') {
      const searchLower = query.toLowerCase();
      filtered = filtered.filter(
        article => 
          article.title.toLowerCase().includes(searchLower) ||
          article.content.toLowerCase().includes(searchLower) ||
          article.author.toLowerCase().includes(searchLower)
      );
    }
    
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredArticles(filtered);
  };

  const handleAddArticle = (newArticle:any) => {
    const updatedArticles = [newArticle, ...articles];
    setArticles(updatedArticles);
  };

  const handleDeleteArticle = async (id:any) => {
    try {
          await deleteArrticle(id);// call API to delete user
      
          // update state after successful deletion
          const updatedArticles = articles.filter(article => article.id !== id);
          setArticles(updatedArticles);
          // setFilteredUsers(updatedUsers);
      
          // Alert.alert('Success', `User ${selectedUser.name} has been deleted`);
        } catch (error) {
          Alert.alert('Error', 'Failed to delete Article. Please try again.');
        }
  };

  const handleArticlePress = (article:any) => {
    setSelectedArticle(article);
    setShowDetailModal(true);
  };

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={globalStyles.loadingText}>Loading articles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={moderateScale(16)} color={colors.text.light} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search articles..."
            placeholderTextColor={colors.text.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowNewModal(true)}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addButtonGradient}
          >
            <Icon name="plus" size={moderateScale(14)} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
      {/* Filter tabs */}
      <View style={styles.filterContainerWrapper}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContentContainer}
        >
          <FilterButton 
            title="All" 
            active={activeFilter === 'all'}
            onPress={() => setActiveFilter('all')}
          />
          <FilterButton 
            title="Today" 
            active={activeFilter === 'today'}
            onPress={() => setActiveFilter('today')}
          />
          <FilterButton 
            title="This Week" 
            active={activeFilter === 'week'}
            onPress={() => setActiveFilter('week')}
          />
          <FilterButton 
            title="This Month" 
            active={activeFilter === 'month'}
            onPress={() => setActiveFilter('month')}
          />
          <FilterButton 
            title="This Year" 
            active={activeFilter === 'year'}
            onPress={() => setActiveFilter('year')}
          />
        </ScrollView>
      </View>
      
      {/* Articles list */}
      {filteredArticles.length > 0 ? (
        <FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleItem 
            item={item} 
            onPressDelete={() => handleDeleteArticle(item.id)} // FIXED
            onPress={() => handleArticlePress(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articleList}
      />
      
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="file-alt" size={moderateScale(48)} color={colors.text.light} />
          <Text style={styles.emptyText}>No articles found</Text>
          <Text style={styles.emptySubtext}>
            {searchQuery ? 'Try different search terms' : 'Create your first article'}
          </Text>
        </View>
      )}
      
      {/* Modals */}
      <NewArticleModal
        visible={showNewModal}
        onClose={() => setShowNewModal(false)}
        onSave={handleAddArticle}
      />

      <ArticleDetailModal
        visible={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        article={selectedArticle}
      />
    </View>
  );
};

export default ArticlesScreen;