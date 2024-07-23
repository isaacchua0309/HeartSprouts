import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { createFriendDocumentWithEvents } from '../../utils/actions/friendCollectionCreation';
import Colors from '../../constants/colors';

function AddFriendScreen({ navigation, route }) {
  const { email } = route.params;
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleAddFriend = async () => {
    if (name.trim()) {
      try {
        setLoading(true);
        await createFriendDocumentWithEvents(email, name, birthday, image);
        setName('');
        setBirthday(new Date());
        setImage(null);
        Alert.alert('Success', 'Friend added successfully', [
          { text: 'OK', onPress: () => navigation.navigate('Users', { email }) }
        ]);
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add a new relationship profile</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Users', { email })}>
          <Icon name="arrow-left" size={24} color={Colors.white500} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainBody}>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {image ? (
              <>
                <Image source={{ uri: image }} style={styles.image} />
                <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
                  <Text style={styles.removeButtonText}>Remove Photo</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.imagePickerText}>Pick an image</Text>
            )}
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowPicker(true)}
          accessible={true}
          accessibilityLabel="Friend's Birthday"
          accessibilityHint="Select your friend's birthday"
        >
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
          <ActivityIndicator size="large" color={Colors.white500} />
        ) : (
          <Button title="Add Friend" onPress={handleAddFriend} color={Colors.white500} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green300,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.green500,
  },
  headerText: {
    fontSize: 24,
    color: Colors.white500,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  mainBody: {
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 50,
    backgroundColor: Colors.white500,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  imagePickerText: {
    color: Colors.black500,
  },
  removeButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    paddingVertical: 5,
  },
  backButton: {},
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.pink700,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: Colors.white500,
    color: Colors.black500,
    width: '100%',
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateInput: {
    backgroundColor: Colors.white500,
    color: '#FFFFFF',
    width: '100%',
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: Colors.green500,
    borderTopWidth: 4,
    borderColor: Colors.green700,
    position: 'absolute',
    bottom: 0,
  },
});

export default AddFriendScreen;

