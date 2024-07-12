import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { firestore } from '../../utils/firebaseHelper'; // Adjust the import based on your project structure
import { collection, getDocs } from 'firebase/firestore';

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
      <Icon name="account" size={30} color={selectedFriends.includes(item.id) ? '#000' : '#fff'} />
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
        <ActivityIndicator size="large" color="#FFFFFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Pick your friends for today</Text>
        <Text style={styles.subText}>Pick up to 3.</Text>
      </View>
      <View style={styles.listContainer}>
        {renderFriendPairs()}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Prompt Answer', { email, rsQuality, selectedFriends })}>
        <Icon name="chevron-right" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 40, // adjust to center the text properly
  },
  subText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pairContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#333333',
    width: '45%', // Ensure the items fit well in two columns
    aspectRatio: 1, // Make the items square
  },
  selectedItem: {
    backgroundColor: '#FFFFFF',
  },
  itemText: {
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
  },
  selectedItemText: {
    color: '#000000',
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    backgroundColor: '#444444',
    borderRadius: 25,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});

export default RelationshipSatisfiedScreen;
