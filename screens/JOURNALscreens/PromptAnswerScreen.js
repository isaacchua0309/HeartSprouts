import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { doc, getDoc, updateDoc, collection, addDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebaseHelper'; // Import Firestore from your helper file
import { format } from 'date-fns';
const PromptAnswerScreen = ({ navigation, route }) => {
  const [text, setText] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(true);
  const [journalLoading, setJournalLoading] = useState(false);
  const [questionId, setQuestionId] = useState(null);
  const { email, rsQuality, selectedFriends } = route.params;

  const fetchUnansweredQuestions = async (email) => {
    try {
      const userDocRef = doc(firestore, 'Users', email);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const unansweredQuestions = userData.questions.filter(q => !q.answered);

        if (unansweredQuestions.length > 0) {
          const randomQuestion = unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)];
          setQuestion(randomQuestion.question);
          setQuestionId(randomQuestion.id);
        } else {
          setQuestion("No more questions available.");
        }
      } else {
        setQuestion("User document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching questions: ", error);
      Alert.alert("Error", "Failed to fetch questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnansweredQuestions(email);
  }, [email]);

const addJournalEntry = async () => {
  setJournalLoading(true);
  try {
    const userDocRef = doc(firestore, 'Users', email);
    const journalCollectionRef = collection(userDocRef, 'Journal');

    // Format the current date and time as the document ID
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyyMMddHHmmss');

    // Add the journal entry with the formatted date as the document ID
    await setDoc(doc(journalCollectionRef, formattedDate), {
      Date: currentDate.toISOString(),
      Quality: rsQuality,
      FriendsSelected: selectedFriends,
      Question: question,
      WordEntry: text
    });

    // Fetch the current XP value
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentXP = userData.XP || 0;

      // Update the XP value
      const newXP = currentXP + 100;
      await updateDoc(userDocRef, {
        XP: newXP,
      });

      // Optionally mark the question as answered
      if (questionId) {
        await updateDoc(userDocRef, {
          [`questions.${questionId}.answered`]: true
        });
      }
    }

    // Show success alert and navigate to the Journal screen on confirmation
    Alert.alert(
      "Success",
      "Journal entry added successfully!",
      [
        {
          text: "OK",
          onPress: () => {
            setText('');
            navigation.navigate('Journal',{email});
          }
        }
      ]
    );
  } catch (error) {
    console.error("Error adding journal entry: ", error);
    Alert.alert("Error", "Failed to add journal entry. Please try again later.");
  } finally {
    setJournalLoading(false);
  }
};

  

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
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
          <TouchableOpacity onPress={() => fetchUnansweredQuestions(email)} style={styles.refreshButton}>
            <Icon name="refresh" size={30} color="#FFFFFF" />
          </TouchableOpacity>
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
          <TouchableOpacity style={styles.checkButton} onPress={addJournalEntry}>
            <Icon name="check" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        {journalLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  refreshButton: {
    marginLeft: 10,
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

export default PromptAnswerScreen;