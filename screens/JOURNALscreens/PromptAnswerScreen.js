import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../../utils/firebaseHelper'; // Import Firestore from your helper file

const PromptAnswerScreen = ({ navigation, route }) => {
  const [text, setText] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(true);
  const [questionId, setQuestionId] = useState(null);
  const { email, rsQuality, selectedFriends } = route.params;

  useEffect(() => {
    const fetchUnansweredQuestions = async () => {
      try {
        const q = query(collection(firestore, 'questions'), where('answered', '==', false));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const questions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
          setQuestion(randomQuestion.question);
          setQuestionId(randomQuestion.id);
        } else {
          setQuestion("No more questions available.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions: ", error);
        setLoading(false);
      }
    };
    fetchUnansweredQuestions();
  }, []);

  const handleQuestionAnswered = async () => {
    if (questionId) {
      const questionDoc = doc(firestore, 'questions', questionId);
      await updateDoc(questionDoc, { answered: true });
      // Navigate or provide feedback to the user that the question is saved
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.avoidingView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{question}</Text>
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
          <TouchableOpacity style={styles.checkButton} onPress={handleQuestionAnswered}>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
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
