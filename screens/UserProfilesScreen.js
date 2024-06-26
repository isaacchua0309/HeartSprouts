import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { firestore } from '../utils/firebaseHelper';
import { collection, getDocs } from 'firebase/firestore';
import Colors from '../constants/colors';
import { requestPermissions, scheduleNotification } from '../utils/notificationHandler';
import fetchEventsForFriend from '../utils/actions/fetchEventsForFriend';

const UserProfilesScreen = ({ navigation, route }) => {
  const [friends, setFriends] = useState([]);
  const { email } = route.params;

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
    } catch (error) {
      console.error('Error fetching friends: ', error);
      Alert.alert('Error', 'There was an error fetching friends. Please try again later.');
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

      fetchFriends().then(() => setupNotifications());
    }, [email])
  );

  const handleProfilePress = (friend) => {
    navigation.navigate('Friend Profile', { friend, email });
  };

  const handleAddFriendPress = () => {
    navigation.navigate('Friend Creation', { email });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Relationship Manager</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.featured}>
          <Text style={styles.featuredText}>Build Healthy Relationships</Text>
          <Text style={styles.subtitleText}>Your personal connections</Text>
        </View>
        <View style={styles.profileContainer}>
          {friends.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              style={styles.profileCard}
              onPress={() => handleProfilePress(friend)}
            >
              <Image style={styles.profileImage} source={{ uri: friend.image }} />
              <Text style={styles.profileName}>{friend.name}</Text>
              <Text style={styles.profileStatus}>{friend.status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddFriendPress}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home', { email })}>
          <Icon name="home" size={24} color={Colors.pink500} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="users" size={24} color={Colors.pink500} />
          <Text style={styles.navText}>Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green300,
  },
  scrollContainer: {
    paddingBottom: 160, // Space for the fixed navbar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
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
    padding: 5,
  },
  featured: {
    padding: 20,
    backgroundColor: Colors.green300,
    alignItems: 'center',
  },
  featuredText: {
    fontSize: 18,
    color: Colors.pink500,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.white700,
    fontStyle: 'italic'
  },
  profileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  profileCard: {
    width: '45%',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileStatus: {
    fontSize: 14,
    color: '#757575',
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 110,
    backgroundColor: Colors.pink500,
    borderRadius: 30,
    elevation: 18,
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
    marginTop: '5%',
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    marginTop: 5,
    color: Colors.white500,
  },
});

export default UserProfilesScreen;



