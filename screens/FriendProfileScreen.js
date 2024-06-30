import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firestore } from '../utils/firebaseHelper';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import Colors from '../constants/colors';

const FriendProfileScreen = ({ navigation, route }) => {
  const { friend, email } = route.params;
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, [friend]);

  useEffect(() => {
    if (events.length > 0) {
      scrollToClosestEvent();
    }
  }, [events]);

  const fetchEvents = async () => {
    try {
      const eventsCollectionRef = collection(firestore, `Users/${email}/Friends/${friend.name}/Events`);
      const querySnapshot = await getDocs(eventsCollectionRef);
      const eventsList = querySnapshot.docs
        .filter(doc => doc.id !== 'EventsInit')
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => a.date.seconds - b.date.seconds);
      setEvents(eventsList);
    } catch (error) {
      console.error('Error fetching events: ', error);
      Alert.alert('Error', 'There was an error fetching events. Please try again later.');
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddEvent = async () => {
    if (eventName.trim()) {
      setIsLoading(true);
      try {
        await addDoc(collection(firestore, `Users/${email}/Friends/${friend.name}/Events`), {
          title: eventName,
          date: eventDate,
          description: '', // Add a description field if needed
        });
        Alert.alert('Success', 'Event added successfully');
        setEventName('');
        setEventDate(new Date());
        setShowPicker(false);
        fetchEvents(); // Refresh events list
      } catch (error) {
        console.error('Error adding event: ', error);
        Alert.alert('Error', 'There was an error adding the event. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert('Error', 'Please enter an event name');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(firestore, `Users/${email}/Friends/${friend.name}/Events`, eventId));
      Alert.alert('Success', 'Event deleted successfully');
      fetchEvents(); // Refresh events list
    } catch (error) {
      console.error('Error deleting event: ', error);
      Alert.alert('Error', 'There was an error deleting the event. Please try again.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowPicker(false);
    setEventDate(currentDate);
  };

  const scrollToClosestEvent = () => {
    const today = new Date();
    const closestEventIndex = events.findIndex(event => new Date(event.date.seconds * 1000) >= today);
    if (closestEventIndex !== -1 && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollTo({ y: closestEventIndex * 150, animated: true });
      }, 500);
    }
  };

  if (!friend) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.errorText}>Friend data not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={Colors.white500} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainBody}>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={{ uri: friend.image }} />
        <Text style={styles.profileName}>{friend.name}</Text>
        <Text style={styles.profileStatus}>{friend.status}</Text>
        {friend.birthday && friend.birthday.seconds && (
          <Text style={styles.profileBirthday}>
            Birthday: {new Date(friend.birthday.seconds * 1000).toLocaleDateString()}
          </Text>
        )}
      </View>
      {<Text style={styles.label}>Add Events For Timely Notifications Before Events!</Text>}
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
        placeholder="Enter event name"
      />
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowPicker(true)}>
        <Text>{eventDate.toDateString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={eventDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button title="Add Event" onPress={handleAddEvent} disabled={isLoading} color={Colors.green300} />
      {isFetching ? (
        <ActivityIndicator size="large" color={Colors.green300} />
      ) : (
        <ScrollView style={styles.eventsContainer} ref={scrollViewRef}>
          {events.map((event, index) => (
            <View key={event.id} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              {event.date && event.date.seconds && (
                <Text style={styles.eventDate}>
                  {new Date(event.date.seconds * 1000).toLocaleDateString()}
                </Text>
              )}
              <Text style={styles.eventDescription}>{event.description}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEvent(event.id)}>
                <Icon name="trash" size={24} color="#ff0000" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white500,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    paddingTop: 16,
    backgroundColor: Colors.green500,
  },
  headerText: {
    fontSize: 24,
    color: Colors.white500,
    fontWeight: 'bold',
    alignItems: 'center'
  },
  backButton: {
    marginBottom: 20,
  },
  mainBody: {
    flex: 1,
    paddingHorizontal: 32
  },
  profileContainer: {
    alignItems:'center'
  },
  // profileImage: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50,
  //   marginBottom: 10,
  // },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '10%'
  },
  // profileStatus: {
  //   fontSize: 16,
  //   color: '#757575',
  //   marginBottom: 0,
  // },
  profileBirthday: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 20,
    fontStyle: 'italic'
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 44,
    borderColor: Colors.white700,
    borderWidth: 2,
    marginBottom: '4%',
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Colors.white700
  },
  dateInput: {
    height: 44,
    borderColor: Colors.white700,
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: Colors.white700
    
  },
  eventsContainer: {
    flex: 1,
    marginTop: 20,
  },
  eventCard: {
    backgroundColor: Colors.green300,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#757575',
  },
  deleteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default FriendProfileScreen;
