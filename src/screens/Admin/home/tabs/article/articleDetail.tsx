import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
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
            
            <Text style={styles.articleContent}>{article.content}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ArticleDetailModal;