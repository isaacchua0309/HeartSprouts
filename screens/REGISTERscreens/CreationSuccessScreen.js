import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';

function CreationSuccessScreen({navigation,route}){
    const {email} = route.params;
    function handlePress() {
        navigation.navigate('Login',{email}); // Replace 'Home' with the name of the screen you want to navigate to
      }
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Account Successfully Created!</Text>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Let's Go!</Text>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.green500,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      button: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
})

export default CreationSuccessScreen;