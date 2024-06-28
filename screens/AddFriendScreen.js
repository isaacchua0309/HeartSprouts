import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createFriendDocumentWithEvents } from '../utils/actions/friendCollectionCreation';

function AddFriendScreen({ navigation, route }) {
  const { email } = route.params;
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleAddFriend = async () => {
    if (name.trim()) {
      try {
        await createFriendDocumentWithEvents(email, name, birthday);
        // Reset the input fields
        setName('');
        setBirthday(new Date());
        Alert.alert('Success', 'Friend added successfully');
      } catch (error) {
        console.error('Error adding friend: ', error);
        Alert.alert('Error', 'There was an error adding the friend. Please try again.');
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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.label}>Friend's Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <Text style={styles.label}>Friend's Birthday</Text>
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowPicker(true)}>
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
      <Button title="Add Friend" onPress={handleAddFriend} />
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
