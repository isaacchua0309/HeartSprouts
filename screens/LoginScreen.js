import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/colors';

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const goBack = () => {
    navigation.goBack();
  };

  function signInHandler(){
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.body}>
        <TextInput 
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.white700}
        />
        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor={Colors.white700}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon name={passwordVisible ? "eye-off" : "eye"} size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          <TouchableOpacity onPress={() => alert('Reset Password Pressed')}>
            <Text style={styles.resetPassword}>    Reset Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={signInHandler}>
          <Text style={styles.signInText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  body: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: Colors.green700,
    color: '#FFFFFF',
    width: '100%',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green700,
    width: '100%',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    color: '#FFFFFF',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  forgotPassword: {
    color: Colors.black300
  },
  resetPassword: {
    color: Colors.white700
  },
  signInButton: {
    backgroundColor: Colors.pink500,
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: Colors.black300,
    fontSize: 18,
  },
});

export default LoginScreen;
