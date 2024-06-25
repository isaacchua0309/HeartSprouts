import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

const friends = [
  { id: 1, name: 'Alice', status: 'Busy', image: 'link-to-image' },
  { id: 2, name: 'Bob', status: 'Available', image: 'link-to-image' },
  { id: 3, name: 'Charlie', status: 'At the gym', image: 'link-to-image' },
  { id: 4, name: 'Dana', status: 'Sleeping', image: 'link-to-image' },
];

const UserProfilesScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
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
        {friends.map((friend, index) => (
          <TouchableOpacity key={index} style={styles.productCard} onPress={() => alert(`Navigating to ${friend.name}'s profile`)}>
            <Image style={styles.productImage} source={{ uri: friend.image }} />
            <Text style={styles.productName}>{friend.name}</Text>
            <Text style={styles.productPrice}>{friend.status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('More Friends')}>
          <Text style={styles.navText}>More Friends</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
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
    padding: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  featuredText: {
    fontSize: 18,
    color: '#fff',
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
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
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
  },
  navButton: {
    paddingVertical: 10,
  },
  navText: {
    fontSize: 16,
  }
});

export default UserProfilesScreen;
