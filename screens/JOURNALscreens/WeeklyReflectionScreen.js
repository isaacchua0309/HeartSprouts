import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../utils/firebaseHelper'; // Adjust this path to your firebaseHelper

const data = [
  { id: '1', title: 'On Relief of Missing Out', description: 'This week, we\'ll stay away from the hustle.', progress: '0/7' },
  { id: '2', title: 'On Embracing Change', description: 'This week, we won\'t be afraid to make changes in our lives.', progress: '0/7' },
  { id: '3', title: 'On Starting Over', description: 'This week, we\'ll start fresh and find ourselves once again.', progress: '0/7' },
  { id: '4', title: 'On Letting Go', description: 'This week, we\'ll say goodbye.', progress: '0/7' },
  { id: '5', title: 'On Purpose', description: 'This week, we\'ll be. But on purpose.', progress: '0/7' },
  { id: '6', title: 'On Joy and Happiness', description: 'This week, we\'ll spend some time joyfully.', progress: '0/7' },
  { id: '7', title: 'On Rest and Recovery', description: 'This week, we\'ll explore resting on purpose.', progress: '0/7' },
  { id: '8', title: 'On Quantity and Quality', description: 'This week, we\'ll compare more with better.', progress: '0/7' },
];

const PromptScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [hasAddedJournalEntryThisWeek, setHasAddedJournalEntryThisWeek] = useState(false);

  const checkJournalEntryThisWeek = async (email) => {
    try {
      const userDocRef = doc(firestore, 'Users', email);
      const journalCollectionRef = collection(userDocRef, 'Journal');
      const journalDocs = await getDocs(journalCollectionRef);

      const currentWeek = getCurrentWeek();

      const hasEntryThisWeek = journalDocs.docs.some(doc => {
        const entryData = doc.data();
        const entryDate = new Date(entryData.Date);
        return getCurrentWeek(entryDate) === currentWeek;
      });

      setHasAddedJournalEntryThisWeek(hasEntryThisWeek);
    } catch (error) {
      console.error("Error checking journal entries: ", error);
      Alert.alert("Error", "Failed to check journal entries. Please try again later.");
    }
  };

  useEffect(() => {
    checkJournalEntryThisWeek(email);
  }, [email]);

  const getCurrentWeek = (date = new Date()) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => alert(item.title)}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <Text style={styles.itemProgress}>{item.progress}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DAILY</Text>
        <Text style={styles.headerSubtitle}>prompts.</Text>
      </View>
      <TouchableOpacity
        style={[styles.promptButton, hasAddedJournalEntryThisWeek && styles.disabledButton]}
        onPress={() => {
          if (!hasAddedJournalEntryThisWeek) {
            navigation.navigate('Satisfaction Rating', { email });
          }
        }}
        disabled={hasAddedJournalEntryThisWeek}
      >
        <Text style={styles.promptButtonText}>
          {hasAddedJournalEntryThisWeek ? "Weekly Prompt Answered" : "Answer Weekly Prompt"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  promptButton: {
    backgroundColor: '#1a73e8',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#555',
  },
  promptButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemTextContainer: {
    maxWidth: '80%',
  },
  itemTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    color: '#aaa',
    fontSize: 14,
  },
  itemProgress: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default PromptScreen;
