import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/firebaseHelper';
import Colors from '../../constants/colors';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'A link to reset your password has been sent to your email!');
    } catch (error) {
      Alert.alert('Error', 'Please use a valid email address');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

        <View style={styles.contentContainer}>
          <ImageBackground source={require('../../assets/HeartSproutsWORD.png')} style={styles.firstimage} />
        </View>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Enter email below to reset password!</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: Colors.green500,
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  firstimage: {
    width: 300,
    height: 90,
    marginBottom: '50%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
    color: Colors.white700,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  input: {
    width: '90%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: Colors.white500,
    color: Colors.black300,
  },
  button: {
    width: '50%',
    padding: 12,
    backgroundColor: Colors.green500,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "600"
  },
});

export default ResetPasswordScreen;


