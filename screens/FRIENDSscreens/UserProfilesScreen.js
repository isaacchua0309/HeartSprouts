import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { firestore } from '../../utils/firebaseHelper';
import { collection, getDocs } from 'firebase/firestore';
import Colors from '../../constants/colors';
import { requestPermissions, scheduleNotification, getAllScheduledNotifications } from '../../utils/notificationHandler';
import fetchEventsForFriend from '../../utils/actions/fetchEventsForFriend';
import { Ionicons } from '@expo/vector-icons';
import { FriendsContext } from '../../utils/FriendsContext';
import emptyProfile from '../../assets/emptyprofileimage.png' // Import the placeholder image

const UserProfilesScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const { friends, setFriends, events, setEvents, loading, setLoading } = useContext(FriendsContext);
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchFriends = async () => {
    try {
      const friendsCollectionRef = collection(firestore, `Users/${email}/Friends`);
      const querySnapshot = await getDocs(friendsCollectionRef);
      const friendsList = querySnapshot.docs
        .filter(doc => doc.id !== 'Friends Init')
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      setFriends(friendsList);
      return friendsList; // Return the friends list for chaining
    } catch (error) {
      console.error('Error fetching friends: ', error);
      Alert.alert('Error', 'There was an error fetching friends. Please try again later.');
    }
  };

  const fetchEvents = async (friendsList) => {
    try {
      setLoading(true); // Start loading
      const allEvents = await Promise.all(
        friendsList.map(async (friend) => {
          const events = await fetchEventsForFriend(email, friend.name);
          return events.map(event => ({ ...event, friendName: friend.name }));
        })
      );
      const flattenedEvents = allEvents.flat();
      const futureEvents = flattenedEvents.filter(a => a.date.seconds > (Date.now() / 1000)); // Filter future events
      futureEvents.sort((a, b) => a.date.seconds - b.date.seconds); // Sort events by date
      setEvents(futureEvents);
      setLoading(false); // Stop loading
    } catch (error) {
      setLoading(false); // Stop loading on error
      console.error('Error fetching events: ', error);
      Alert.alert('Error', 'There was an error fetching events. Please try again later.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      const setupNotifications = async () => {
        const permissionGranted = await requestPermissions();
        if (!permissionGranted) return;

        for (const friend of friends) {
          try {
            const events = await fetchEventsForFriend(email, friend.name);
            for (const event of events) {
              const notificationTime = new Date(event.date.seconds * 1000);
              notificationTime.setHours(notificationTime.getHours() - 24); // Notify 1 hour before the event
              await scheduleNotification(`Event Reminder`, `Don't forget about ${event.title}!`, notificationTime);
            }
          } catch (error) {
            Alert.alert('Error', `There was an error setting up notifications for ${friend.name}.`);
          }
        }
      };

      fetchFriends().then((friendsList) => {
        if (friendsList && friendsList.length > 0) {
          fetchEvents(friendsList).then(() => setupNotifications());
        }
      });
    }, [email])
  );

  const handleProfilePress = (friend) => {
    navigation.navigate('Friend Profile', { friend, email });
  };

  const handleAddFriendPress = () => {
    navigation.navigate('Friend Creation', { email });
  };

  const handleNotificationsPress = async () => {
    setModalVisible(true);
    await fetchEvents(friends);
  };

  return (
    <View style={styles.container}>

      <View style={styles.fullHeader}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Relationship Manager</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity testID="bell-button" style={styles.bellButton} onPress={handleNotificationsPress}>
              <Icon name="bell" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.featured}>
          <View style={styles.featuredTextContainer}>
            <Text style={styles.featuredText}>Your closest personal connections</Text>
          </View>
          <TouchableOpacity testID="add-friend-button" style={styles.addButton} onPress={handleAddFriendPress}>
            <Icon name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          {friends.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              style={[styles.profileCard, friends.length === 1 && styles.singleProfileCard]}
              onPress={() => handleProfilePress(friend)}
            >
              <Image
                style={styles.profileImage}
                source={friend.image ? { uri: friend.image } : emptyProfile}
              />
              <Text style={styles.profileName}>{friend.name}</Text>
              <Text style={styles.profileStatus}>{friend.status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Upcoming Events</Text>
            {loading ? (
              <ActivityIndicator size="large" color={Colors.green500} />
            ) : (
              <ScrollView contentContainerStyle={styles.modalContent}>
                {events.map((event, index) => (
                  <View key={index} style={styles.notificationItem}>
                    <Text style={styles.notificationTitle}>{event.title}</Text>
                    <Text style={styles.notificationTime}>{new Date(event.date.seconds * 1000).toLocaleString()}</Text>
                    <Text style={styles.notificationFriend}>Friend: {event.friendName}</Text>
                  </View>
                ))}
              </ScrollView>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green500,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 160, // Space for the fixed navbar
    paddingTop: 20,
  },
  fullHeader: {
    borderBottomWidth: 4,
    borderColor: Colors.green300,
    paddingHorizontal: '10%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '3%',
    backgroundColor: Colors.green500,
  },
  headerText: {
    fontSize: 24,
    color: Colors.white500,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  searchButton: {
    marginLeft: 20,
  },
  bellButton: {
    marginLeft: 20,
  },
  featured: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    backgroundColor: Colors.green500,
  },
  featuredTextContainer: {
    flex: 1,
  },
  featuredText: {
    fontSize: 16,
    color: Colors.white700,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.pink500,
    fontStyle: 'italic',
  },
  addButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.pink500,
    padding: 10,
    height: 42,
    width: 42,
    borderRadius: 21,
    elevation: 2,
  },
  profileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  profileCard: {
    width: '45%', // Two cards per row
    marginBottom: 20, // Space between rows
    backgroundColor: Colors.green500,
    borderRadius: 10,
    alignItems: 'center',
  },
  singleProfileCard: {
    width: '100%', // Full width for a single profile card
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 24,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white700,
  },
  profileStatus: {
    fontSize: 14,
    color: '#757575',
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
  },
  modalContainer: {
    width: '80%',
    backgroundColor: Colors.white500,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalContent: {
    maxHeight: 400,
  },
  notificationItem: {
    marginBottom: 20,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: 14,
    color: '#757575',
  },
  notificationFriend: {
    fontSize: 14,
    color: Colors.green700,
  },
  closeButton: {
    marginTop: 20,
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

export default UserProfilesScreen;
