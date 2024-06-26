import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have react-native-vector-icons installed
import Colors from '../constants/colors';

function NameInputScreen({navigation}){
    const [name, setName] = useState('');

    function nextScreenHandler(){
        navigation.navigate('Birthday Input',{name});
    }

    return <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.progressBar}>
        <View style={[styles.progressStep, styles.activeStep]} />
        <View style={styles.progressStep} />
        <View style={styles.progressStep} />
        <View style={styles.progressStep} />
      </View>
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>What’s your full name?</Text>
      <Text style={styles.subtitle}>
        A nickname will do too, this is for other sprouts to connect and recognize you
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Jane Doe"
          placeholderTextColor={Colors.white700}
          onChangeText={setName}
          value = {name}
        />
        <TouchableOpacity style={styles.sendButton} onPress = {nextScreenHandler}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  </View>

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
        fontWeight: '600'
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
        color: Colors.white500,
        fontSize: 16,
      },
      sendButton: {
        marginLeft: 10,
      },
})

export default NameInputScreen;