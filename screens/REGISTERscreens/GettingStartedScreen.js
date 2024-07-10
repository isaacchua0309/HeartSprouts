import React from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import Colors from '../../constants/colors';

function GettingStartedScreen({ navigation }) {
  function nextScreenHandler() {
    navigation.navigate('Name Input');
  }

  function signInHandler() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>

      <View style={styles.signInBox}>
        <Text style={styles.signInText}>
          Already have an account?     {' '}
        </Text>
        <Pressable onPress={signInHandler} style={styles.signInText}>
            <Text style={styles.signInLink}>Sign In Here</Text>
        </Pressable>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.mainText}>Warmest Welcome to, </Text>
        <ImageBackground
          source={ require('../../assets/somesprouts.png')} // Replace with your image URL or local path
          style={styles.firstimage}
        />
        <ImageBackground
          source={ require('../../assets/HeartSproutsWORD.png')} // Replace with your image URL or local path
          style={styles.secondimage}
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
    fontSize: '16'
  },
  signInBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInLink: {
    fontWeight: 'bold',
    color: Colors.white700,
    fontSize: '16'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: Colors.pink500,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  firstimage: {
    width: 240,
    height: 140,
  },
  secondimage: {
    width: 300, // Adjust the size of the image
    height: 90, // Adjust the size of the image
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.green700, // Use the appropriate button background color
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 24, // Adjust as needed
  },
  buttonText: {
    color: Colors.white700, // Use the appropriate text color
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default GettingStartedScreen;
