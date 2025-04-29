import React, { useState } from 'react';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    padding: 15,
  },
  noteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  noteDate: {
    fontSize: 14,
    color: '#3498db',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
});