import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/articlesDetail.styles';

export const ArticleDetailScreen = ({ route }: any) => {
  const { article } = route.params;
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(article.title);
  const [editedContent, setEditedContent] = useState(article.content);
  const isUserArticle = true;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ARTICLE</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.mainContainer}>
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
        >
          {isEditing ? (
            <>
              <TextInput
                style={styles.editTitleInput}
                value={editedTitle}
                onChangeText={setEditedTitle}
                placeholder="Article title"
              />
              <View style={styles.metaContainer}>
                <Text style={styles.author}>By {article.author}</Text>
                <Text style={styles.date}>{formatDate(article.date)}</Text>
              </View>
              <TextInput
                style={styles.editContentInput}
                value={editedContent}
                onChangeText={setEditedContent}
                placeholder="Article content"
                multiline
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>{article.title}</Text>
              <View style={styles.metaContainer}>
                <Text style={styles.author}>By {article.author}</Text>
                <Text style={styles.date}>{formatDate(article.date)}</Text>
              </View>
              <Text style={styles.content}>{article.content}</Text>
            </>
          )}
          <View style={styles.spacer} />
        </ScrollView>
        
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity 
            style={styles.bottomBackButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.bottomBackButtonText}>Return to Articles</Text>
          </TouchableOpacity>
          
          {isUserArticle && (
            <View style={styles.userActionButtonsContainer}>
              {isEditing ? (
                <>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={() => {
                      setEditedTitle(article.title);
                      setEditedContent(article.content);
                      setIsEditing(false);
                    }}
                  >
                    <Text style={styles.actionButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.saveButton]}
                  >
                    <Text style={styles.actionButtonText}>Save Changes</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => setIsEditing(true)}
                  >
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                  >
                    <Text style={styles.actionButtonText}>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};