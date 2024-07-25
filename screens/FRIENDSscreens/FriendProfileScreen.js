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
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import { firestore, storage } from '../../utils/firebaseHelper';
import {
  collection,
  getDocs,
  getDoc,
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AddEventModal = ({ isVisible, onClose, onAddEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowPicker(false);
    setEventDate(currentDate);
  };

  const handleAddEvent = () => {
    if (eventName.trim()) {
      onAddEvent(eventName, eventDate);
      setEventName('');
      setEventDate(new Date());
      onClose();
    } else {
      Alert.alert('Error', 'Please enter an event name');
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.overlayContainer}>
        <View style={styles.overlayContent}>
          <Text style={styles.overlayTitle}>Add Event</Text>
          <TextInput
            style={styles.input}
            value={eventName}
            onChangeText={setEventName}
            placeholder="Enter event name"
          />
          <TouchableOpacity style={styles.dateInput} onPress={() => setShowPicker(true)}>
            <Text>{eventDate.toDateString()} {eventDate.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={eventDate}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Button title="Add Event" onPress={handleAddEvent} />
          <Button title="Cancel" onPress={onClose} color="#ff0000" />
        </View>
      </View>
    </Modal>
  );
};

const FriendProfileScreen = ({ navigation, route }) => {
  const { friend, email } = route.params;
  const [events, setEvents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(friend.name);
  const [newBirthday, setNewBirthday] = useState(
    friend.birthday.toDate ? friend.birthday.toDate() : new Date()
  );
  const [newImage, setNewImage] = useState(friend.image);
  const [imageUploading, setImageUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
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

  const handleAddEvent = async (eventName, eventDate) => {
    if (eventName.trim()) {
      setIsLoading(true);
      try {
        const eventDocRef = await addDoc(
          collection(firestore, `Users/${email}/Friends/${friend.name}/Events`),
          {
            title: eventName,
            date: Timestamp.fromDate(eventDate),
            description: '',
          }
        );

        const notificationId = await scheduleNotification(eventName, eventDate);
        await updateDoc(eventDocRef, { notificationId });

        Alert.alert('Success', 'Event added successfully');
        fetchEvents();
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

  const scheduleNotification = async (title, date) => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `${title}`,
          body: `Don't forget ${title}!`,
        },
        trigger: {
          date,
        },
      });
      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification: ', error);
      return null;
    }
  };

  const deleteNotificationById = async (notificationId) => {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      console.log(`Canceled notification with ID ${notificationId}`);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      setIsLoading(true);
      const eventDocRef = doc(firestore, `Users/${email}/Friends/${friend.name}/Events`, eventId);

      const eventDoc = await getDoc(eventDocRef);
      if (eventDoc.exists()) {
        const { notificationId } = eventDoc.data();
        await deleteDoc(eventDocRef);

        if (notificationId) {
          await deleteNotificationById(notificationId);
        }

        Alert.alert('Success', 'Event deleted successfully');
        fetchEvents();
      } else {
        Alert.alert('Error', 'Event not found');
      }
    } catch (error) {
      console.error('Error deleting event: ', error);
      Alert.alert('Error', 'There was an error deleting the event. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    setImageUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `profileImages/${filename}`);
    uploadBytes(storageRef, blob)
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        setNewImage(downloadURL);
        setImageUploading(false);
      })
      .catch((error) => {
        console.error('Error uploading image: ', error);
        Alert.alert('Error', 'There was an error uploading the image. Please try again.');
        setImageUploading(false);
      });
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

              const eventsCollectionRef = collection(
                firestore,
                `Users/${email}/Friends/${friend.name}/Events`
              );
              const querySnapshot = await getDocs(eventsCollectionRef);
              const deletePromises = querySnapshot.docs.map(async (doc) => {
                const event = doc.data();
                await deleteNotificationById(event.notificationId);
                return deleteDoc(doc.ref);
              });
              await Promise.all(deletePromises);

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

  const getAllScheduledNotifications = async () => {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      return notifications;
    } catch (error) {
      console.error('Error fetching scheduled notifications: ', error);
      throw error;
    }
  };

  const handleCheckNotifications = async () => {
    try {
      const scheduledNotifications = await getAllScheduledNotifications();
      console.log('Scheduled Notifications:', scheduledNotifications);
      Alert.alert('Scheduled Notifications', JSON.stringify(scheduledNotifications));
      console.log("Updated scheduled notifications:", scheduledNotifications.length);
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
              <Image style={styles.profileImage} source={require('../../assets/emptyprofileimage.png')} />
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
        <Button title="Add Event" onPress={() => setModalVisible(true)} color={Colors.white500} />
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.white500} />
        ) : (
          <ScrollView style={styles.eventsContainer} ref={scrollViewRef}>
            {events.map((event, index) => (
              <View key={event.id} style={styles.eventCard}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                {event.date && event.date.seconds && (
                  <Text style={styles.eventDate}>
                    {new Date(event.date.seconds * 1000).toLocaleDateString()} at {new Date(event.date.seconds * 1000).toLocaleTimeString()}
                  </Text>
                )}
                <Text style={styles.eventDescription}>{event.description}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEvent(event.id)}>
                  <Icon name="trash" size={24} color={Colors.red500} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
        <Button title="Check Notifications" onPress={handleCheckNotifications} color={Colors.blue500} />
      </View>
      <AddEventModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onAddEvent={handleAddEvent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green500,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
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
    width: 150,
    height: 150,
    borderRadius: 75,
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
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: '5%',
    color: Colors.white500
  },
  profileStatus: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 0,
  },
  profileBirthday: {
    fontSize: 16,
    color: Colors.white700,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  label: {
    fontSize: 19,
    marginBottom: 12,
    alignItems: 'center',
    color: Colors.white700
  },
  input: {
    height: 44,
    borderColor: Colors.white700,
    borderWidth: 2,
    marginVertical: '4%',
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
    marginTop: 15,
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
    color: Colors.black300,
    marginBottom:'3%'
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
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayContent: {
    width: '90%',
    backgroundColor: Colors.green700,
    borderRadius: 10,
    padding: 20,
  },
  overlayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.white500,
    textAlign: 'center',
  },
});

export default FriendProfileScreen;







