import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PromptAnswerScreen = () => {
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.avoidingView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>What do you plan to do today?</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Start writing..."
          placeholderTextColor="#888888"
          multiline
          value={text}
          onChangeText={setText}
        />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="plus" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkButton}>
            <Icon name="check" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  avoidingView: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#333333',
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#444444',
    borderRadius: 25,
  },
  checkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#444444',
    borderRadius: 25,
  },
});

export default PromptAnswerScreen;
