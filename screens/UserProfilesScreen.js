import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

const friends = [
  { id: 1, name: 'Alice', status: 'Busy', image: 'https://via.placeholder.com/80' },
  { id: 2, name: 'Bob', status: 'Available', image: 'https://via.placeholder.com/80' },
  { id: 3, name: 'Charlie', status: 'At the gym', image: 'https://via.placeholder.com/80' },
  { id: 4, name: 'Dana', status: 'Sleeping', image: 'https://via.placeholder.com/80' },
];

const UserProfilesScreen = ({ navigation }) => {
  const handleProfilePress = (name) => {
    Alert.alert('Profile Navigation', `Navigating to ${name}'s profile`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Close Friends</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.featured}>
          <Text style={styles.featuredText}>Catch up with Friends!</Text>
          <Text style={styles.discountText}>Your personal connections</Text>
        </View>
        <View style={styles.productContainer}>
          {friends.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              style={styles.productCard}
              onPress={() => handleProfilePress(friend.name)}
            >
              <Image style={styles.productImage} source={{ uri: friend.image }} />
              <Text style={styles.productName}>{friend.name}</Text>
              <Text style={styles.productStatus}>{friend.status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={24} color="#000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('MoreFriends')}>
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
  discountText: {
    fontSize: 16,
    color: '#fff',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  productCard: {
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
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productStatus: {
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
