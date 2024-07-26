import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator, Modal, Image, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { startOfWeek, subWeeks, format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/colors';
import { JournalContext } from '../../utils/JournalContext';
import { firestore } from '../../utils/firebaseHelper';
import { doc, getDoc } from 'firebase/firestore';

const screenWidth = Dimensions.get('window').width;

const PromptScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const {
    hasAddedJournalEntryThisWeek,
    rsQualityData,
    journalEntries,
    topFriends,
    loading,
    setLoading,
    expandedEntries,
    setExpandedEntries,
    shouldRefresh,
    setShouldRefresh,
    fetchJournalData,
  } = useContext(JournalContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [friendImages, setFriendImages] = useState({});
  const [validTopFriends, setValidTopFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchJournalData(email);
      setLoading(false);
      setShouldRefresh(false); // Reset shouldRefresh state
      await fetchFriendImages();
    };

    if (shouldRefresh) {
      fetchData();
    } else {
      setLoading(false);
      fetchFriendImages();
    }
  }, [email, shouldRefresh]);

  const fetchFriendImages = async () => {
    const images = {};
    const validFriends = [];
    for (const friend of topFriends) {
      const friendDocRef = doc(firestore, `Users/${email}/Friends`, friend);
      const friendDoc = await getDoc(friendDocRef);
      if (friendDoc.exists()) {
        const friendData = friendDoc.data();
        images[friend] = friendData.image || null;
        validFriends.push(friend); // Add only valid friends
      }
    }
    setFriendImages(images);
    setValidTopFriends(validFriends); // Set valid friends list
  };

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
      <View style={styles.loadingContainer} testID="loading-indicator">
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
      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.promptButtonText}>View Journal Entries</Text>
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
        fromZero={true}
        yAxisInterval={1}
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
          yAxisLabel: '',
          yAxisSuffix: '',
          yLabelsOffset: 20,
          xLabelsOffset: 5,
          yAxisMin: 0,
          yAxisMax: 10,
        }}
        style={{
          borderRadius: 16,
          marginHorizontal: 20,
        }}
      />
      <View style={styles.topFriendsContainer}>
        <Text style={styles.topFriendsTitle}>Top Friends Selected:</Text>
        {validTopFriends.length > 0 ? (
          validTopFriends.map((friend, index) => (
            <View key={index} style={styles.friendContainer}>
              {friendImages[friend] ? (
                <Image source={{ uri: friendImages[friend] }} style={styles.friendImage} />
              ) : (
                <Image source={require('../../assets/emptyprofileimage.png')} style={styles.friendImage} />
              )}
              <Text style={styles.friendName}>{friend}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noFriendsText}>No friends selected in the past month.</Text>
        )}
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Journal Entries</Text>
            <FlatList
              data={journalEntries}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.list}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Journal', { email })}>
          <Ionicons name="book" size={24} color={Colors.green300} />
          <Text style={styles.navText}>Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home', { email })}>
          <Icon name="home" size={24} color={Colors.green300} />
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
    flexGrow: 1,
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
  modalButton: {
    backgroundColor: Colors.green300,
    padding: 12,
    marginBottom: 20,
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
    backgroundColor: Colors.green500,
    padding: 20,
    borderRadius: 10,
    marginBottom: 14,
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
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  friendImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  friendName: {
    color: Colors.white500,
    fontSize: 16,
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
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '8%'
  },
  modalContainer: {
    width: '100%',
    height: '90%',
    backgroundColor: Colors.green300,
    borderRadius: 10,
    padding: 20,
    paddingVertical: '0%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  closeButton: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.green500,
    borderRadius: 5,
  },
  closeButtonText: {
    color: Colors.white500,
    fontSize: 16,
  },
});

export default PromptScreen;



