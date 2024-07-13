import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from '../../utils/firebaseHelper';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { startOfWeek, subWeeks, isSameWeek, format } from 'date-fns';

const screenWidth = Dimensions.get('window').width;

const PromptScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [hasAddedJournalEntryThisWeek, setHasAddedJournalEntryThisWeek] = useState(false);
  const [rsQualityData, setRsQualityData] = useState(new Array(5).fill(0));
  const [journalEntries, setJournalEntries] = useState([]);
  const [topFriends, setTopFriends] = useState([]);

  const checkJournalEntryThisWeek = async (email) => {
    try {
      const userDocRef = doc(firestore, 'Users', email);
      const journalCollectionRef = collection(userDocRef, 'Journal');
      const journalQuery = query(journalCollectionRef, orderBy('Date', 'desc'), limit(1));
      const journalDocs = await getDocs(journalQuery);

      if (!journalDocs.empty) {
        const mostRecentEntry = journalDocs.docs[0].data();
        const mostRecentEntryDate = new Date(mostRecentEntry.Date);
        const currentWeek = startOfWeek(new Date(), { weekStartsOn: 0 });
        if (isSameWeek(mostRecentEntryDate, currentWeek, { weekStartsOn: 0 })) {
          setHasAddedJournalEntryThisWeek(true);
        } else {
          setHasAddedJournalEntryThisWeek(false);
        }
      }
    } catch (error) {
      console.error("Error checking journal entries: ", error);
      Alert.alert("Error", "Failed to check journal entries. Please try again later.");
    }
  };

  const fetchRsQualityData = async (email) => {
    try {
      const userDocRef = doc(firestore, 'Users', email);
      const journalCollectionRef = collection(userDocRef, 'Journal');
      const journalDocs = await getDocs(journalCollectionRef);

      const endDate = new Date();
      const startDate = subWeeks(endDate, 4);
      let qualityData = new Array(5).fill(0);

      journalDocs.docs.forEach(doc => {
        const entryData = doc.data();
        const entryDate = new Date(entryData.Date);

        for (let i = 0; i < 5; i++) {
          const startOfCurrentWeek = startOfWeek(subWeeks(endDate, i), { weekStartsOn: 0 });
          if (isSameWeek(entryDate, startOfCurrentWeek, { weekStartsOn: 0 })) {
            qualityData[4 - i] += entryData.Quality;
          }
        }
      });

      setRsQualityData(qualityData);
    } catch (error) {
      console.error("Error fetching RS Quality data: ", error);
    }
  };

  const fetchJournalEntries = async (email) => {
    try {
      const userDocRef = doc(firestore, 'Users', email);
      const journalCollectionRef = collection(userDocRef, 'Journal');
      const journalQuery = query(journalCollectionRef, orderBy('Date', 'desc'));
      const journalDocs = await getDocs(journalQuery);

      const entries = journalDocs.docs.map(doc => ({
        id: doc.id,
        date: new Date(doc.data().Date),
        friends: doc.data().FriendsSelected,
        quality: doc.data().Quality,
        question: doc.data().Question,
        wordEntry: doc.data().WordEntry
      }));

      setJournalEntries(entries);
    } catch (error) {
      console.error("Error fetching journal entries: ", error);
    }
  };

  const fetchTopFriends = async (email) => {
    try {
      const userDocRef = doc(firestore, 'Users', email);
      const journalCollectionRef = collection(userDocRef, 'Journal');
      const journalDocs = await getDocs(journalCollectionRef);

      const friendCounts = {};

      journalDocs.docs.forEach(doc => {
        const entryData = doc.data();
        const entryDate = new Date(entryData.Date);

        if (entryDate >= subWeeks(new Date(), 4)) {
          entryData.FriendsSelected.forEach(friend => {
            if (friendCounts[friend]) {
              friendCounts[friend]++;
            } else {
              friendCounts[friend] = 1;
            }
          });
        }
      });

      const sortedFriends = Object.entries(friendCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(entry => entry[0]);

      setTopFriends(sortedFriends);
    } catch (error) {
      console.error("Error fetching top friends: ", error);
    }
  };

  useEffect(() => {
    fetchRsQualityData(email);
    fetchJournalEntries(email);
    fetchTopFriends(email);
  }, []);

  const getMonthName = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[date.getMonth()];
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('JournalDetail', { journalEntry: item })}
    >
      <Text style={styles.itemDate}>{format(item.date, 'PP')}</Text>
      <Text style={styles.itemQuestion}>{item.question}</Text>
      <Text style={styles.itemEntry}>{item.wordEntry}</Text>
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
      <LineChart
        data={{
          labels: Array.from({ length: 5 }, (_, i) => getMonthName(subWeeks(new Date(), 4 - i))),
          datasets: [
            {
              data: rsQualityData,
              color: () => `rgba(26, 115, 232, 1)`,
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        withShadow={true}
        withBezier={true}
        chartConfig={{
          backgroundColor: '#000',
          backgroundGradientFrom: '#000',
          backgroundGradientTo: '#000',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginHorizontal: 20,
        }}
      />
      <View style={styles.topFriendsContainer}>
        <Text style={styles.topFriendsTitle}>Top Friends Selected:</Text>
        {topFriends.length > 0 ? (
          topFriends.map((friend, index) => (
            <Text key={index} style={styles.friendName}>{friend}</Text>
          ))
        ) : (
          <Text style={styles.noFriendsText}>No friends selected in the past month.</Text>
        )}
      </View>
      <FlatList
        data={journalEntries}
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
    marginBottom: 15,
  },
  itemDate: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
  },
  itemQuestion: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemEntry: {
    color: '#aaa',
    fontSize: 14,
  },
  topFriendsContainer: {
    padding: 20,
    backgroundColor: '#222',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  topFriendsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  noFriendsText: {
    color: '#aaa',
    fontSize: 16,
  },
});

export default PromptScreen;
