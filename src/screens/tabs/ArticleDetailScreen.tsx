import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/articlesDetail.styles';

export const ArticleDetailScreen = ({ route }: any) => {
  const { article, currentUser } = route.params;
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(article.title);
  const [editedContent, setEditedContent] = useState(article.content);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  const isUserArticle = currentUser && article.author === currentUser.name;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSaveChanges = () => {
    // Here you would implement the actual save logic
    // For now, we'll just close the modal and editing mode
    setShowSaveModal(false);
    setIsEditing(false);
    Alert.alert('Success', 'Article updated successfully');
  };

  const handleDeleteArticle = () => {
    setShowDeleteModal(false);
    Alert.alert('Success', 'Article deleted successfully');
    navigation.goBack();
  };

  const DeleteConfirmationModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showDeleteModal}
      onRequestClose={() => setShowDeleteModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Delete Article</Text>
          <Text style={styles.modalText}>Are you sure you want to delete this article?</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelModalButton]} 
              onPress={() => setShowDeleteModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.confirmModalButton]} 
              onPress={handleDeleteArticle}
            >
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const SaveConfirmationModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showSaveModal}
      onRequestClose={() => setShowSaveModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Save Changes</Text>
          <Text style={styles.modalText}>Are you sure you want to save these changes?</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelModalButton]} 
              onPress={() => setShowSaveModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.confirmModalButton]} 
              onPress={handleSaveChanges}
            >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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
        >
          {isEditing && isUserArticle ? (
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
                    onPress={() => setShowSaveModal(true)}
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
                    onPress={() => setShowDeleteModal(true)}
                  >
                    <Text style={styles.actionButtonText}>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>
      </View>
      
      <DeleteConfirmationModal />
      <SaveConfirmationModal />
    </SafeAreaView>
  );
};