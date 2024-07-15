import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { firestore, storage } from '../../utils/firebaseHelper';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
  query,
  where,
  writeBatch,
  setDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Colors from '../../constants/colors';
import {
  requestNotificationPermissions,
  scheduleNotification,
  cancelNotification,
  getAllScheduledNotifications,
} from '../../utils/actions/notificationsHelper'; // Import notification helpers

const FriendProfileScreen = ({ navigation, route }) => {
  const { friend, email } = route.params;
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(friend.name);
  const [newBirthday, setNewBirthday] = useState(
    friend.birthday.toDate ? friend.birthday.toDate() : new Date()
  );
  const [newImage, setNewImage] = useState(friend.image);
  const [imageUploading, setImageUploading] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchEvents();
    requestNotificationPermissions(); // Request notification permissions on component mount
  }, [friend]);

  useEffect(() => {
    if (events.length > 0) {
      scrollToClosestEvent();
    }
  }, [events]);

  const fetchEvents = async () => {
    try {
      const eventsCollectionRef = collection(
        firestore,
        `Users/${email}/Friends/${friend.name}/Events`
      );
      const querySnapshot = await getDocs(eventsCollectionRef);
      const eventsList = querySnapshot.docs
        .filter((doc) => doc.id !== 'EventsInit')
        .map((doc) => ({
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
        const eventDocRef = await addDoc(
          collection(firestore, `Users/${email}/Friends/${friend.name}/Events`),
          {
            title: eventName,
            date: eventDate,
            description: '', // Add a description field if needed
          }
        );
        const notificationId = await scheduleNotification(eventName, 'Event is coming up!', eventDate);
        await updateDoc(eventDocRef, { notificationId });

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
      const eventDocRef = doc(firestore, `Users/${email}/Friends/${friend.name}/Events`, eventId);
      const eventDoc = await getDoc(eventDocRef);
      if (eventDoc.exists) {
        const { notificationId } = eventDoc.data();
        if (notificationId) {
          await cancelNotification(notificationId);
        }
      }

      await deleteDoc(eventDocRef);
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
    const closestEventIndex = events.findIndex(
      (event) => new Date(event.date.seconds * 1000) >= today
    );
    if (closestEventIndex !== -1 && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollTo({ y: closestEventIndex * 150, animated: true });
      }, 500);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setNewImage(result.assets[0].uri);
    }
  };

  const checkNameClash = async (name) => {
    const friendsRef = collection(firestore, `Users/${email}/Friends`);
    const q = query(friendsRef, where('name', '==', name));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const saveChanges = async () => {
    try {
      setIsLoading(true);

      if (newName !== friend.name) {
        const nameClash = await checkNameClash(newName);
        if (nameClash) {
          Alert.alert('Error', 'A friend with this name already exists. Please choose a different name.');
          setIsLoading(false);
          return;
        }
      }

      const friendDocRef = doc(firestore, `Users/${email}/Friends`, friend.name);

      await updateDoc(friendDocRef, {
        name: newName,
        birthday: Timestamp.fromDate(newBirthday),
        image: newImage,
      });

      if (newName !== friend.name) {
        // Update the collection name
        const oldEventsCollectionRef = collection(firestore, `Users/${email}/Friends/${friend.name}/Events`);
        const newEventsCollectionRef = collection(firestore, `Users/${email}/Friends/${newName}/Events`);
        
        const querySnapshot = await getDocs(oldEventsCollectionRef);
        const batch = writeBatch(firestore);

        querySnapshot.forEach((docSnapshot) => {
          const newDocRef = doc(newEventsCollectionRef, docSnapshot.id);
          batch.set(newDocRef, docSnapshot.data());
        });

        await batch.commit();

        const deleteBatch = writeBatch(firestore);
        querySnapshot.forEach((docSnapshot) => {
          const oldDocRef = doc(oldEventsCollectionRef, docSnapshot.id);
          deleteBatch.delete(oldDocRef);
        });

        await deleteBatch.commit();

        // Update the friend document
        const newFriendDocRef = doc(firestore, `Users/${email}/Friends`, newName);
        await setDoc(newFriendDocRef, { ...friend, name: newName });

        await deleteDoc(friendDocRef);
      }

      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile: ', error);
      Alert.alert('Error', 'There was an error updating the profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    Alert.alert(
      'Delete Friend',
      'Are you sure you want to delete this friend? This action will delete all associated data and cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);

              // Delete all events associated with the friend
              const eventsCollectionRef = collection(
                firestore,
                `Users/${email}/Friends/${friend.name}/Events`
              );
              const querySnapshot = await getDocs(eventsCollectionRef);
              const deletePromises = querySnapshot.docs.map((doc) =>
                deleteDoc(doc.ref)
              );
              await Promise.all(deletePromises);

              // Delete friend profile
              const friendDocRef = doc(firestore, `Users/${email}/Friends`, friend.name);
              await deleteDoc(friendDocRef);

              Alert.alert('Success', 'Friend profile deleted successfully');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting profile: ', error);
              Alert.alert('Error', 'There was an error deleting the profile. Please try again.');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleCheckNotifications = async () => {
    try {
      const scheduledNotifications = await getAllScheduledNotifications();
      console.log('Scheduled Notifications:', scheduledNotifications);
      Alert.alert('Scheduled Notifications', JSON.stringify(scheduledNotifications));
    } catch (error) {
      console.error('Error fetching scheduled notifications: ', error);
      Alert.alert('Error', 'There was an error fetching scheduled notifications. Please try again.');
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
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Icon name="edit" size={24} color={Colors.white500} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainBody}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={isEditing ? pickImage : null}>
            {newImage ? (
              <Image style={styles.profileImage} source={{ uri: newImage }} />
            ) : (
              <View style={styles.placeholderImage}>
                <Icon name="user" size={50} color={Colors.white500} />
              </View>
            )}
          </TouchableOpacity>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={newName}
                onChangeText={setNewName}
                placeholder="Enter name"
              />
              <TouchableOpacity style={styles.dateInput} onPress={() => setShowPicker(true)}>
                <Text>{newBirthday.toDateString()}</Text>
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker
                  value={newBirthday}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowPicker(false);
                    setNewBirthday(date);
                  }}
                />
              )}
              <Button title="Save Changes" onPress={saveChanges} disabled={isLoading || imageUploading} />
              <Button title="Delete Profile" onPress={handleDeleteProfile} disabled={isLoading} color="#ff0000" />
            </>
          ) : (
            <>
              <Text style={styles.profileName}>{friend.name}</Text>
              <Text style={styles.profileStatus}>{friend.status}</Text>
              {friend.birthday && friend.birthday.seconds && (
                <Text style={styles.profileBirthday}>
                  Birthday: {new Date(friend.birthday.seconds * 1000).toLocaleDateString()}
                </Text>
              )}
            </>
          )}
        </View>
        <Text style={styles.label}>Add Events For Timely Notifications Before Events!</Text>
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
        <Button title="Check Notifications" onPress={handleCheckNotifications} color={Colors.blue500} />
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
    alignItems: 'center',
  },
  backButton: {
    marginBottom: 20,
  },
  mainBody: {
    flex: 1,
    paddingHorizontal: 32,
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
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.green300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '10%',
  },
  profileStatus: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 0,
  },
  profileBirthday: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 20,
    fontStyle: 'italic',
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
    backgroundColor: Colors.white700,
  },
  dateInput: {
    height: 44,
    borderColor: Colors.white700,
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: Colors.white700,
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
