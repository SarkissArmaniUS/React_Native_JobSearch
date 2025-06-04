import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FrequentSearches = ({ initialTags = [], onPressTag }) => {
  const [tags, setTags] = useState(initialTags);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const loadTags = async () => {
      try {
        const json = await AsyncStorage.getItem('FREQUENT_SEARCHES');
        if (json) {
          setTags(JSON.parse(json));
        }
      } catch (e) {
        console.error('Failed to load frequent searches', e);
      }
    };
    loadTags();
  }, []);

  useEffect(() => {
    const saveTags = async () => {
      try {
        await AsyncStorage.setItem('FREQUENT_SEARCHES', JSON.stringify(tags));
      } catch (e) {
        console.error('Failed to save frequent searches', e);
      }
    };
    saveTags();
  }, [tags]);

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (trimmed === '') {
      Alert.alert('Error', 'Please enter a non-empty tag.');
      return;
    }
    if (tags.includes(trimmed)) {
      Alert.alert('Duplicate', `"${trimmed}" is already in your list.`);
      return;
    }
    setTags(prev => [trimmed, ...prev]);
    setNewTag('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frequent Searches</Text>

      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="e.g., frontend"
          value={newTag}
          onChangeText={setNewTag}
          onSubmitEditing={handleAddTag}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTag}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tagsContainer}>
        {tags.map(tag => (
          <TouchableOpacity
            key={tag}
            style={styles.tag}
            onPress={() => onPressTag(tag)}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FrequentSearches;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 40,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
});
