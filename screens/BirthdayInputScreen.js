import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have react-native-vector-icons installed
import Colors from '../constants/colors';

function BirthdayInputScreen({navigation,route}){
  const {name} = route.params
  const [birthday, setBirthday] = useState('');

    function nextScreenHandler(){
        navigation.navigate('Email Input',{name,birthday});
    }

    return <View style={styles.container}>
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
        We use this to personalize your Agapé experience.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="MM/DD/YYYY"
          placeholderTextColor={Colors.white700}
          onChangeText={setBirthday}
          value = {birthday}
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
      notification: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
      },
      notificationIcon: {
        marginRight: 10,
      },
      notificationTextContainer: {
        flex: 1,
      },
      notificationText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      notificationSubText: {
        color: '#fff',
      },
      notificationTime: {
        color: '#aaa',
        fontSize: 12,
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
        color: Colors.white700,
        fontSize: 16,
      },
      sendButton: {
        marginLeft: 10,
      },
})

export default BirthdayInputScreen;