import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.body}>
        <TextInput 
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9A9A9A"
        />
        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#9A9A9A"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon name={passwordVisible ? "eye-off" : "eye"} size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          <TouchableOpacity onPress={() => alert('Reset Password Pressed')}>
            <Text style={styles.resetPassword}> Reset Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
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
    backgroundColor: '#0E0E1F',
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
    backgroundColor: '#0E0E1F',
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
    color: '#9A9A9A',
  },
  resetPassword: {
    color: '#FFFFFF',
  },
  signInButton: {
    backgroundColor: '#F2D492',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: '#000000',
    fontSize: 18,
  },
});

export default LoginScreen;
