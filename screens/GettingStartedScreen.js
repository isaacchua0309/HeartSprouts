import React from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import Colors from '../constants/colors';

function GettingStartedScreen({ navigation }) {
  function nextScreenHandler() {
    navigation.navigate('Name Input');
  }

  function signInHandler() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.signInText}>
          Have an account?{' '}
        </Text>
        <Pressable onPress={signInHandler} style={styles.signInText}>
            <Text style={styles.signInLink}>Sign In Here</Text>
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.mainText}>Welcome to HeartSprouts !</Text>
        <ImageBackground
          source={{ uri: 'https://your-image-url.com/image.png' }} // Replace with your image URL or local path
          style={styles.image}
        />
      </View>
      <Pressable style={styles.button} onPress={nextScreenHandler}>
        <Text style={styles.buttonText}>GET STARTED</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green500, // Use the appropriate background color
    padding: 20,
    justifyContent: 'space-between',
  },
  signInText: {
    color: Colors.white500,
    textAlign: 'center',
  },
  signInLink: {
    fontWeight: 'bold',
    color: Colors.white500,
  
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: Colors.white500,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  image: {
    width: 200, // Adjust the size of the image
    height: 200, // Adjust the size of the image
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.white500, // Use the appropriate button background color
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 40, // Adjust as needed
  },
  buttonText: {
    color: '#1B0638', // Use the appropriate text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GettingStartedScreen;
