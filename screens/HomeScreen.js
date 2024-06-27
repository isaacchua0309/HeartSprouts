import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import Icon from 'react-native-vector-icons/FontAwesome'; 
import nlp from 'compromise';
import * as chrono from 'chrono-node';

function HomeScreen({ navigation }) {
  
  const [searchText, setSearchText] = useState('');

  const handleSubmit = () => {
    const parsedData = parseEventDetails(searchText);
    if (parsedData) {
      Alert.alert('Parsed Event Details', JSON.stringify(parsedData, null, 2));
    } else {
      Alert.alert('Error', 'Failed to parse event details');
    }
  };

  const parseEventDetails = (text) => {
    const doc = nlp(text);
    const parsedDate = chrono.parseDate(text);
    const date = parsedDate ? parsedDate.toISOString().split('T')[0] : 'Unknown';
    const personName = doc.people().out('text');
    const eventName = doc.nouns().out('text');

    if (date && eventName && personName) {
      return {
        name: personName,
        date: date,
        eventName: eventName,
      };
    } else {
      return null; // Handle parsing failure
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.greeting}>Enter your events with friends to set up reminders!</Text>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Commands"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <TouchableOpacity style={styles.iconButton} onPress={handleSubmit}>
              <Ionicons name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Dinner with Darren tomorrow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Add Shannon's Birthday on 13th May</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Kelly relationship struggles</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Users')}>
        <Icon name="users" size={24} color="#000" />
          <Text style={styles.navText}>Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
  scrollContainer: {
    paddingBottom: 60, // Space for the fixed navbar
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  iconButton: {
    padding: 10,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default HomeScreen;
