import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FriendProfileScreen = ({ navigation, route }) => {
  const { friend } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={{ uri: friend.image }} />
        <Text style={styles.profileName}>{friend.name}</Text>
        <Text style={styles.profileStatus}>{friend.status}</Text>
        <Text style={styles.profileBirthday}>Birthday: {new Date(friend.birthday.seconds * 1000).toDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileStatus: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 10,
  },
  profileBirthday: {
    fontSize: 16,
    color: '#757575',
  },
});

export default FriendProfileScreen;
