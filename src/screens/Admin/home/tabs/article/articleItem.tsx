import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, moderateScale } from '../../../../../styles/admin/theme';
import styles from '../../../../../styles/admin/article.style';

const ArticleItem = ({ item, onPressDelete, onPress }:any) => {
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <TouchableOpacity 
      style={styles.articleItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.articleHeader}>
        <View style={styles.authorContainer}>
          <View style={styles.authorAvatar}>
            <Text style={styles.authorInitial}>{item.author.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.authorName}>{item.author}</Text>
            <Text style={styles.articleDate}>{formattedDate}</Text>
          </View>
        </View>
        <TouchableOpacity 
          onPress={() => onPressDelete(item.id)} 
          style={styles.deleteButton}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Icon name="trash-alt" size={moderateScale(14)} color={colors.error} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.articleTitle}>{item.title}</Text>
      
      <View style={styles.articleFooter}>
        <View style={styles.articleStats}>
          <View style={styles.statItem}>
            <Icon name="heart" size={moderateScale(12)} color={colors.text.light} solid />
            <Text style={styles.statText}>{item.likes}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="comment-alt" size={moderateScale(12)} color={colors.text.light} solid />
            <Text style={styles.statText}>{item.comments}</Text>
          </View>
        </View>
        <View style={styles.readMoreContainer}>
          <Text style={styles.readMoreText}>Read More</Text>
          <Icon name="chevron-right" size={moderateScale(12)} color={colors.primary} style={styles.readMoreIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleItem;