import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import Icon from 'react-native-vector-icons/FontAwesome';
import nlp from 'compromise';
import * as chrono from 'chrono-node';
import Colors from '../constants/colors';

function HomeScreen({ navigation, route }) {
  const [searchText, setSearchText] = useState('');
  const { email } = route.params;

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
      <Text style={styles.greeting}>
        Tell me anything about your friends, family and loved ones 
        (TEXT TO ADD EVENT NOT IMPLEMENTED YET BUT CAN BE ADDED MANUALLY IN FRIENDS PROFILE)
      </Text>
      <Text style={styles.exampleText}>
        examples;{'\n'}
        Dinner with Darren tomorrow.{'\n'}
        Shannon's Birthday on 13th May.{'\n'}
        Isaac relationship struggles
      </Text>
      <View style={styles.centeredContent}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="(NOT IMPLEMENTED YET)"
              placeholderTextColor='black'
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <TouchableOpacity style={styles.iconButton} onPress={handleSubmit}>
              <Ionicons name="send" size={24} color={Colors.black500} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home', { email })}>
          <Ionicons name="home" size={24} color={Colors.pink500} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Users', { email })}>
          <Icon name="users" size={24} color={Colors.pink500} />
          <Text style={styles.navText}>Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green500,
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: Colors.white500,
  },
  exampleText: {
    fontStyle: 'italic',
    color: Colors.white700,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  centeredContent: {
    width: '100%',
    alignItems: 'center',
  },
  searchContainer: {
    width: '95%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.pink500,
    borderRadius: 15,
    padding: 4,
    paddingHorizontal: 10,
    marginBottom: '45%'
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  iconButton: {
    padding: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: Colors.green500,
    borderTopWidth: 4,
    borderColor: Colors.green700,
    position: 'absolute',
    bottom: 0,
  },
  navButton: {
    marginTop:'5%',
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    marginTop: 5,
    color: Colors.white700
  },
});

export default HomeScreen;
