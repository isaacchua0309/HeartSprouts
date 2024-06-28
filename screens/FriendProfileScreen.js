import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firestore } from '../utils/firebaseHelper';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const FriendProfileScreen = ({ navigation, route }) => {
  const { friend } = route.params;
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [friend.id]);

  const fetchEvents = async () => {
    try {
      const eventsCollectionRef = collection(firestore, `Users/${friend.email}/Friends/${friend.name}/Events`);
      const querySnapshot = await getDocs(eventsCollectionRef);
      const eventsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);
    } catch (error) {
      console.error('Error fetching events: ', error);
      Alert.alert('Error', 'There was an error fetching events. Please try again later.');
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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowPicker(false);
    setEventDate(currentDate);
  };

  // Handle case where friend data might be missing
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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={{ uri: friend.image }} />
        <Text style={styles.profileName}>{friend.name}</Text>
        <Text style={styles.profileStatus}>{friend.status}</Text>
        <Text style={styles.profileBirthday}>Birthday: {new Date(friend.birthday.seconds * 1000).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.label}>Add Event</Text>
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
      <Button title="Add Event" onPress={handleAddEvent} disabled={isLoading} />
      <ScrollView style={styles.eventsContainer}>
        {events.map(event => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDate}>{new Date(event.date.seconds * 1000).toLocaleDateString()}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileStatus: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 10,
  },
  profileBirthday: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  eventsContainer: {
    flex: 1,
    marginTop: 20,
  },
  eventCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default FriendProfileScreen;
