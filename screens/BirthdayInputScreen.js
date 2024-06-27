import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have react-native-vector-icons installed
import Colors from '../constants/colors';

function BirthdayInputScreen({ navigation, route }) {
  const { name } = route.params;
  const [birthday, setBirthday] = useState('');

  function validateDate(date) {
    const re = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
    if (!re.test(date)) return false;

    const [month, day, year] = date.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  }

  function nextScreenHandler() {
    if (validateDate(birthday)) {
      navigation.navigate('Email Input', { name, birthday });
    } else {
      Alert.alert('Invalid Date', 'Please enter a valid date in MM/DD/YYYY format.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={styles.progressStep} />
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>When is your birthday?</Text>
        <Text style={styles.subtitle}>
          So we know when to give you a lil birthday gift :)
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="MM/DD/YYYY"
            placeholderTextColor={Colors.white700}
            onChangeText={setBirthday}
            value={birthday}
          />
          <TouchableOpacity style={styles.sendButton} onPress={nextScreenHandler}>
            <Icon name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green500,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 32,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: '#aaa',
    marginHorizontal: 4,
    borderRadius: 2,
  },
  activeStep: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.white500,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: Colors.pink500,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green700,
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    color: Colors.white700,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default BirthdayInputScreen;
