import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, doc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { firestore } from '../../utils/firebaseHelper';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { startOfWeek, subWeeks, isSameWeek, format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { JournalContext } from '../../utils/JournalContext';

const screenWidth = Dimensions.get('window').width;

const PromptScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const {
    hasAddedJournalEntryThisWeek,
    setHasAddedJournalEntryThisWeek,
    rsQualityData,
    setRsQualityData,
    journalEntries,
    setJournalEntries,
    topFriends,
    setTopFriends,
    loading,
    setLoading
  } = useContext(JournalContext);

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
    const fetchData = async () => {
      await checkJournalEntryThisWeek(email);
      await fetchRsQualityData(email);
      await fetchJournalEntries(email);
      await fetchTopFriends(email);
      setLoading(false);
    };

    fetchData();
  }, [email]);

  const getMonthName = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[date.getMonth()];
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedEntries[item.id];
    const words = item.wordEntry.split(' ');
    const preview = words.slice(0, 20).join(' ');
    const remaining = words.slice(20).join(' ');

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemDate}>{format(item.date, 'PP')}</Text>
        <Text style={styles.itemQuestion}>{item.question}</Text>
        <Text style={styles.itemEntry}>
          {isExpanded ? item.wordEntry : preview}
          {words.length > 20 && (
            <TouchableOpacity onPress={() => setExpandedEntries(prevState => ({ ...prevState, [item.id]: !isExpanded }))}>
              <Text style={styles.toggleText}>{isExpanded ? ' Less' : '... More'}</Text>
            </TouchableOpacity>
          )}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.green300} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WEEKLY</Text>
        <Text style={styles.headerSubtitle}>journal prompts.</Text>
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
        height={220} // Increased height
        withShadow={true}
        withBezier={true}
        fromZero={true} // Ensure y-axis starts from 0
        yAxisInterval={1} // Sets the interval of y-axis labels
        chartConfig={{
          backgroundColor: Colors.green700,
          backgroundGradientFrom: Colors.green700,
          backgroundGradientTo: Colors.green700,
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: Colors.green300,
          },
          yAxisLabel: '', // Optional, you can add a unit if needed
          yAxisSuffix: '', // Optional, you can add a suffix if needed
          yLabelsOffset: 20, // Adjusts the y-axis label offset
          xLabelsOffset: 5, // Adjusts the x-axis label offset
          yAxisMin: 0,
          yAxisMax: 10, // Ensure y-axis range is from 0 to 10
        }}
        style={{
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
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Journal', { email })}>
          <Ionicons name="book" size={24} color={Colors.green300} />
          <Text style={styles.navText}>Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home', { email })}>
          <Ionicons name="home" size={24} color={Colors.green300} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Users', { email })}>
          <Icon name="users" size={24} color={Colors.green300} />
          <Text style={styles.navText}>Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.green500,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green500,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.green500,
    borderBottomWidth: 3,
    borderBottomColor: Colors.green300,
  },
  headerTitle: {
    color: Colors.white500,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerSubtitle: {
    color: Colors.white500,
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  promptButton: {
    backgroundColor: Colors.green300,
    padding: 12,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%'
  },
  disabledButton: {
    backgroundColor: Colors.green700,
  },
  promptButtonText: {
    color: Colors.white500,
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 0,
  },
  itemContainer: {
    backgroundColor: Colors.green700,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  itemDate: {
    color: Colors.white700,
    fontSize: 14,
    marginBottom: 5,
  },
  itemQuestion: {
    color: Colors.white500,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemEntry: {
    color: Colors.white700,
    fontSize: 14,
  },
  toggleText: {
    color: Colors.green300,
    fontSize: 14,
    marginTop: 5,
  },
  topFriendsContainer: {
    padding: 20,
    backgroundColor: Colors.green700,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    width: '100%'
  },
  topFriendsTitle: {
    color: Colors.white500,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendName: {
    color: Colors.white500,
    fontSize: 16,
    marginBottom: 5,
  },
  noFriendsText: {
    color: Colors.white700,
    fontSize: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: Colors.green500,
    borderTopWidth: 4,
    borderColor: Colors.green300,
    position: 'absolute',
    bottom: 0,
  },
  navButton: {
    marginTop: '5%',
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    marginTop: 5,
    color: Colors.white500,
  }
});

export default PromptScreen;
