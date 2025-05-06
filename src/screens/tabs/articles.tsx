import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/articles.styles';

type Article = {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  content: string;
};


export const ArticlesScreen = () => {
  const navigation = useNavigation();
  const [articles, setArticles] = useState([
    { 
      id: '1', 
      title: 'Understanding Your Cycle',
      author: 'Dr. Sarah Johnson',
      date: '2025-05-05', 
      summary: 'A comprehensive guide to understanding your menstrual cycle and its phases.',
      content: 'Your menstrual cycle is a natural process that your body goes through approximately every 28 days. It consists of four main phases: menstruation, the follicular phase, ovulation, and the luteal phase.\n\nDuring menstruation, the uterine lining sheds, causing your period. This typically lasts 3-7 days. The follicular phase follows, during which follicles in your ovaries develop, preparing an egg for release. This phase is characterized by increasing estrogen levels.\n\nOvulation occurs around day 14 of your cycle when a mature egg is released from the ovary. The luteal phase follows ovulation and lasts until your next period. During this time, progesterone levels rise, and if the egg isn\'t fertilized, hormones drop, triggering your next period.\n\nUnderstanding these phases can help you recognize patterns in your energy levels, mood, and physical symptoms throughout the month. Tracking your cycle can provide valuable insights into your overall health and well-being.' 
    },
    { 
      id: '2', 
      title: 'Nutrition for Hormonal Balance',
      author: 'Maria Chen, Nutritionist',
      date: '2025-05-01', 
      summary: 'Foods that can help balance your hormones and reduce period symptoms.',
      content: 'What you eat can significantly impact your hormonal balance. Certain foods can help alleviate period symptoms and support overall reproductive health.\n\nFoods rich in omega-3 fatty acids, like fatty fish, flaxseeds, and walnuts, have anti-inflammatory properties that may reduce menstrual pain. Iron-rich foods such as leafy greens, legumes, and red meat can help replenish iron lost during menstruation.\n\nComplex carbohydrates like whole grains provide steady energy and help stabilize blood sugar levels, which can reduce mood swings. Magnesium-rich foods, including dark chocolate, avocados, and bananas, may help alleviate cramps and improve sleep quality during your period.\n\nStay hydrated and limit caffeine and alcohol, especially during the luteal phase, as they can exacerbate PMS symptoms and affect sleep quality.\n\nConsider incorporating anti-inflammatory herbs like ginger and turmeric into your diet. These can be consumed as teas or added to meals to help reduce inflammation and period pain.\n\nRemember that consistency is key when it comes to nutrition for hormonal health. Small, sustainable changes to your diet can lead to significant improvements in your menstrual health over time.' 
    },
    { 
      id: '3', 
      title: 'Exercise Through Your Cycle',
      author: 'Emma Williams, Fitness Coach',
      date: '2025-04-28', 
      summary: 'How to adapt your workouts to each phase of your menstrual cycle.',
      content: 'Your energy levels and exercise capacity can fluctuate throughout your menstrual cycle due to hormonal changes. Adapting your workout routine to these phases can help you optimize performance and recovery.\n\nDuring menstruation (days 1-5), you might feel low in energy. Light activities like walking, gentle yoga, or stretching can help alleviate cramps and boost mood without overtaxing your body.\n\nIn the follicular phase (days 6-14), rising estrogen levels often bring increased energy and strength. This is an excellent time for high-intensity workouts, strength training, or trying new challenging activities.\n\nAround ovulation (day 14), your energy peaks. Take advantage of this by scheduling your most demanding workouts or competitions during this time.\n\nDuring the luteal phase (days 15-28), as progesterone rises, you might notice decreased energy and endurance. Focus on moderate-intensity activities like swimming, cycling, or Pilates. Strength training with lower weights and higher reps can be effective.\n\nListen to your body throughout your cycle and adjust intensity as needed. Tracking your symptoms alongside your workouts can help you identify patterns and optimize your exercise routine for better performance and well-being.' 
    },
    { 
      id: '4', 
      title: 'Managing Period Pain Naturally',
      author: 'Dr. Lisa Patel',
      date: '2025-04-25', 
      summary: 'Natural remedies and lifestyle changes to reduce menstrual discomfort.',
      content: 'Period pain, or dysmenorrhea, affects many individuals with menstrual cycles. While over-the-counter pain relievers can help, several natural approaches can also provide relief.\n\nHeat therapy is one of the most effective natural remedies for menstrual cramps. Applying a heating pad or hot water bottle to your lower abdomen can help relax the uterine muscles and increase blood flow, reducing pain.\n\nCertain herbal teas, particularly those containing ginger, chamomile, or peppermint, may help alleviate cramps and soothe digestive issues that often accompany periods.\n\nGentle movement, such as walking or specific yoga poses designed for menstrual discomfort, can increase circulation and release endorphins, which act as natural pain relievers.\n\nMassage therapy, particularly focusing on the lower back and abdomen, can help relax tense muscles and reduce pain. Essential oils like lavender or clary sage, when diluted properly, can enhance the benefits of massage.\n\nDietary changes can also make a difference. Reducing caffeine, salt, and sugar intake during your period might decrease bloating and mood swings. Increasing consumption of anti-inflammatory foods and staying well-hydrated can help manage symptoms.\n\nMindfulness practices, including meditation and deep breathing exercises, can help manage the perception of pain and reduce stress, which often exacerbates period discomfort.\n\nRemember that severe or debilitating period pain is not normal and should be discussed with a healthcare provider, as it could indicate underlying conditions like endometriosis or fibroids.' 
    },
  ]);
  
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleContent, setNewArticleContent] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const addArticle = () => {
    if (newArticleTitle.trim() === '' || newArticleContent.trim() === '') return;
    
    const today = new Date().toISOString().split('T')[0];
    const newId = (parseInt(articles[0]?.id || '0') + 1).toString();
    
    setArticles([
      { 
        id: newId, 
        title: newArticleTitle.trim(),
        author: 'Me', 
        date: today, 
        summary: newArticleContent.trim().substring(0, 100) + '...',
        content: newArticleContent.trim() 
      },
      ...articles
    ]);
    
    setNewArticleTitle('');
    setNewArticleContent('');
    setShowAddForm(false);
  };

  const renderItem = ({ item }:any) => (
    <TouchableOpacity 
      style={styles.articleCard}
      onPress={() => navigation.navigate('ArticleDetail', { article: item })}
    >
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleAuthor}>By {item.author}</Text>
      <Text style={styles.articleDate}>{formatDate(item.date)}</Text>
      <Text style={styles.articleSummary}>{item.summary}</Text>
      <Text style={styles.readMore}>Read more →</Text>
    </TouchableOpacity>
  );

  // const formatDate = (dateString:any) => {
  //   const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //   return new Date(dateString).toLocaleDateString(undefined, options);
  // };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ARTICLES</Text>
      </View>

      {!showAddForm ? (
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setShowAddForm(true)}
        >
          <Text style={styles.addButtonText}>Write New Article</Text>
        </TouchableOpacity>
      ) : (
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
              onPress={addArticle}
            >
              <Text style={styles.actionButtonText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

