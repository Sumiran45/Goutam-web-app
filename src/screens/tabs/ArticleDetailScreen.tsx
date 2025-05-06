import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/articlesDetail.styles';

export const ArticleDetailScreen = ({ route }:any) => {
  const { article } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DETAIL</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.mainContainer}>
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.title}>{article.title}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.author}>By {article.author}</Text>
            <Text style={styles.date}>{new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
          </View>
          <Text style={styles.content}>{article.content}</Text>
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