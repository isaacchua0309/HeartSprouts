import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have react-native-vector-icons installed

function EmailInputScreen({navigation, route}){
  const [email, setEmail] = useState('');
  const {name,birthday} = route.params;
    function nextScreenHandler(){
        navigation.navigate('Password Input',{name,birthday,email});
    }

    return <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.progressBar}>
        <View style={styles.progressStep} />
        <View style={styles.progressStep} />
        <View style={[styles.progressStep, styles.activeStep]} />
        <View style={styles.progressStep} />
      </View>
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>What email would you like to use to sign in?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value = {email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.sendButton} onPress={nextScreenHandler}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B0638',
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
      },
      progressStep: {
        flex:1,
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
        marginBottom: 10,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 25,
        padding: 10,
        paddingHorizontal: 20,
      },
      input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
      },
      sendButton: {
        marginLeft: 10,
      },
})

export default EmailInputScreen;