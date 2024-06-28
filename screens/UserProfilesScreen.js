import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firestore } from '../utils/firebaseHelper';
import { collection, getDocs } from 'firebase/firestore';

const UserProfilesScreen = ({ navigation, route }) => {
  const [friends, setFriends] = useState([]);
  const { email } = route.params;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsCollectionRef = collection(firestore, `Users/${email}/Friends`);
        const querySnapshot = await getDocs(friendsCollectionRef);
        const friendsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFriends(friendsList);
      } catch (error) {
        console.error('Error fetching friends: ', error);
        Alert.alert('Error', 'There was an error fetching friends. Please try again later.');
      }
    };

    fetchFriends();
  }, [email]);

  const handleProfilePress = (name) => {
    Alert.alert('Profile Navigation', `Navigating to ${name}'s profile`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Close Friends</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('Friend Creation', { email })}
            >
              <Icon name="plus" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton}>
              <Icon name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.featured}>
          <Text style={styles.featuredText}>Catch up with Friends!</Text>
          <Text style={styles.subtitleText}>Your personal connections</Text>
        </View>
        <View style={styles.profileContainer}>
          {friends.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              style={styles.profileCard}
              onPress={() => handleProfilePress(friend.name)}
            >
              <Image style={styles.profileImage} source={{ uri: friend.image }} />
              <Text style={styles.profileName}>{friend.name}</Text>
              <Text style={styles.profileStatus}>{friend.status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={24} color="#000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="users" size={24} color="#000" />
          <Text style={styles.navText}>Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    paddingBottom: 60, // Space for the fixed navbar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4CAF50',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  addButton: {
    marginRight: 15,
    padding: 5,
  },
  searchButton: {
    padding: 5,
  },
  featured: {
    padding: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  featuredText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 16,
    color: '#fff',
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
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default UserProfilesScreen;
