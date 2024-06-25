import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const UserProfilesScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fruits</Text>
        <TouchableOpacity style={styles.searchButton}>
          {/* Add search icon here */}
        </TouchableOpacity>
      </View>
      <View style={styles.featured}>
        <Text style={styles.featuredText}>Featured in Fruits</Text>
        <Text style={styles.discountText}>40% off</Text>
      </View>
      <View style={styles.filterSortContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Text>Sort</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productContainer}>
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <View key={index} style={styles.productCard}>
            <Text style={styles.productName}>Product Name</Text>
            <Text style={styles.productPrice}>$25</Text>
          </View>
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
          onPress={() => navigation.navigate('Users')}>
          <Text style={styles.navText}>Another Screen</Text>
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
    // Add styles for the search button
  },
  featured: {
    padding: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  featuredImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  featuredText: {
    fontSize: 18,
    color: '#fff',
  },
  discountText: {
    fontSize: 16,
    color: '#fff',
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  sortButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
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
