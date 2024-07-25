import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { firestore } from '../../utils/firebaseHelper'; // Adjust the import based on your project structure
import { collection, getDocs } from 'firebase/firestore';
import Colors from '../../constants/colors'; // Make sure to adjust the import path according to your project structure

const RelationshipSatisfiedScreen = ({ navigation, route }) => {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { email, rsQuality } = route.params;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsCollection = collection(firestore, `Users/${route.params.email}/Friends`);
        const friendsSnapshot = await getDocs(friendsCollection);
        const friendsList = friendsSnapshot.docs.filter(doc => doc.id !== 'Friends Init').map(doc => ({ id: doc.id, ...doc.data() }));
        setFriends(friendsList);
      } catch (error) {
        console.error('Error fetching friends: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [route.params.email]);

  const handlePress = (friend) => {
    setSelectedFriends((prev) =>
      prev.includes(friend.id)
        ? prev.filter((id) => id !== friend.id)
        : prev.length < 3
        ? [...prev, friend.id]
        : prev
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedFriends.includes(item.id) && styles.selectedItem,
      ]}
      onPress={() => handlePress(item)}
    >
      <Icon name="account" size={30} color={selectedFriends.includes(item.id) ? Colors.green700 : Colors.white500} />
      <Text style={[styles.itemText, selectedFriends.includes(item.id) && styles.selectedItemText]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderFriendPairs = () => {
    const pairs = [];
    for (let i = 0; i < friends.length; i += 2) {
      pairs.push(
        <View style={styles.pairContainer} key={i}>
          {renderItem({ item: friends[i] })}
          {friends[i + 1] && renderItem({ item: friends[i + 1] })}
        </View>
      );
    }
    return pairs;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.white500} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={30} color={Colors.white500} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Which relationships were the highlights of your week?</Text>
        <Text style={styles.subText}>Pick up to 3.</Text>
      </View>
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.scrollViewContent}>
        {renderFriendPairs()}
      </ScrollView>
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Prompt Answer', { email, rsQuality, selectedFriends })}>
        <Icon name="chevron-right" size={30} color={Colors.white500} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green500,
    padding: 20,
  },
  header: {
    marginVertical: 8,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerText: {
    color: Colors.white500,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 40, // Adjust to center the text properly
  },
  subText: {
    color: Colors.white500,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: 8,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 0,
  },
  pairContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.green700,
    width: '45%', // Ensure the items fit well in two columns
    aspectRatio: 1, // Make the items square
  },
  selectedItem: {
    backgroundColor: Colors.white500,
  },
  itemText: {
    color: Colors.white500,
    marginTop: 10,
    textAlign: 'center',
  },
  selectedItemText: {
    color: Colors.green700,
  },
  nextButton: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: Colors.green700,
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green500,
  },
});

export default RelationshipSatisfiedScreen;

