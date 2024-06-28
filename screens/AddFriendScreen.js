import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createFriendDocumentWithEvents } from '../utils/actions/friendCollectionCreation';

function AddFriendScreen({ navigation, route }) {
  const { email } = route.params;
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddFriend = async () => {
    if (name.trim()) {
      try {
        setLoading(true);
        await createFriendDocumentWithEvents(email, name, birthday);
        setLoading(false);
        // Reset the input fields
        setName('');
        setBirthday(new Date());
        Alert.alert('Success', 'Friend added successfully');
      } catch (error) {
        setLoading(false);
        if (error.message === 'A friend with this name already exists.') {
          Alert.alert('Error', 'A friend with this name already exists.');
        } else {
          console.error('Error adding friend: ', error);
          Alert.alert('Error', 'There was an error adding the friend. Please try again.');
        }
      }
    } else {
      Alert.alert('Error', 'Please enter both name and birthday');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowPicker(false);
    setBirthday(currentDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Users',{email})} accessible={true} accessibilityLabel="Go back" accessibilityHint="Navigates to the previous screen">
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.label}>Friend's Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
        accessible={true}
        accessibilityLabel="Friend's Name"
        accessibilityHint="Enter your friend's name"
      />
      <Text style={styles.label}>Friend's Birthday</Text>
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowPicker(true)} accessible={true} accessibilityLabel="Friend's Birthday" accessibilityHint="Select your friend's birthday">
        <Text>{birthday.toDateString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Add Friend" onPress={handleAddFriend} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
});

export default AddFriendScreen;
