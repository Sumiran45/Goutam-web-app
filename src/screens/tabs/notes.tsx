import React, { useState } from 'react';
import { styles } from '../../styles/Notes.styles';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export const NotesScreen = () => {
  const [notes, setNotes] = useState([
    { id: '1', date: '2025-04-28', content: 'Feeling tired today with mild cramps.' },
    { id: '2', date: '2025-04-27', content: 'Mood swings and slight headache. Taking it easy today.' },
    { id: '3', date: '2025-04-26', content: 'Period started. Heavy flow and back pain.' },
    { id: '4', date: '2025-04-20', content: 'Feeling energetic and productive!' },
  ]);
  
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim() === '') return;
    
    const today = new Date().toISOString().split('T')[0];
    const newId = (parseInt(notes[0]?.id || '0') + 1).toString();
    
    setNotes([
      { id: newId, date: today, content: newNote.trim() },
      ...notes
    ]);
    
    setNewNote('');
  };

  const renderItem = ({ item }:any) => (
    <View style={styles.noteCard}>
      <Text style={styles.noteDate}>{formatDate(item.date)}</Text>
      <Text style={styles.noteContent}>{item.content}</Text>
    </View>
  );

  const formatDate = (dateString:any) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MY NOTES</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="How are you feeling today?"
          value={newNote}
          onChangeText={setNewNote}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={addNote}>
          <Text style={styles.addButtonText}>Add Note</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
