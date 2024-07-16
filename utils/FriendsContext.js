import React, { createContext, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firebaseHelper';

export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFriends = async (email) => {
    setLoading(true);
    try {
      const friendsCollectionRef = collection(firestore, `Users/${email}/Friends`);
      const querySnapshot = await getDocs(friendsCollectionRef);
      const friendsList = querySnapshot.docs
        .filter(doc => doc.id !== 'Friends Init')
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setFriends(friendsList);
    } catch (error) {
      console.error('Error fetching friends: ', error);
      Alert.alert('Error', 'There was an error fetching friends. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FriendsContext.Provider value={{ friends, setFriends, events, setEvents, loading, setLoading, fetchFriends }}>
      {children}
    </FriendsContext.Provider>
  );
};
