import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/colors';

function PassWordInputScreen({ navigation,route }) {
  const [password, setPassword] = useState('');
  const {name,birthday,email} = route.params;
  const [hasEightCharacters, setHasEightCharacters] = useState(false);
  const [hasCapitalLetter, setHasCapitalLetter] = useState(false);
  const [hasLowercaseLetter, setHasLowercaseLetter] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function nextScreenHandler() {
    if (hasEightCharacters && hasCapitalLetter && hasLowercaseLetter && hasNumber) {
      
      navigation.navigate('Account Creation Successful');
    } else {
      alert('Please ensure your password meets all the requirements.');
    }
  }

  function handlePasswordChange(input) {
    setPassword(input);
    setHasEightCharacters(input.length >= 8);
    setHasCapitalLetter(/[A-Z]/.test(input));
    setHasLowercaseLetter(/[a-z]/.test(input));
    setHasNumber(/[0-9]/.test(input));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
          <View style={[styles.progressStep, styles.activeStep]} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>What password would you like to secure your account with?</Text>
        <View style={styles.validationContainer}>
          <Text style={[styles.validationText, hasEightCharacters && styles.valid]}>✓ 8 CHARACTERS</Text>
          <Text style={[styles.validationText, hasCapitalLetter && styles.valid]}>✓ 1 CAPITAL</Text>
          <Text style={[styles.validationText, hasLowercaseLetter && styles.valid]}>✓ 1 LOWERCASE</Text>
          <Text style={[styles.validationText, hasNumber && styles.valid]}>✓ 1 NUMBER</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.white700}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={handlePasswordChange}
            autoFocus
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#fff" />
          </TouchableOpacity>
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
    paddingRight: 32
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
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  validationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  validationText: {
    color: '#fff',
    margin: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#333',
    backgroundColor: '#333',
    overflow: 'hidden'
  },
  valid: {
    backgroundColor: '#28a745',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green700,
    borderRadius: 24,
    padding: 10,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    color: Colors.white70,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default PassWordInputScreen;
