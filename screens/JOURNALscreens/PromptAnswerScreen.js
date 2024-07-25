import React, { useState, useEffect, useContext } from 'react';
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
import { doc, getDoc, updateDoc, collection, setDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebaseHelper';
import { format, startOfWeek, isSameWeek } from 'date-fns'; // Import necessary date-fns functions
import Colors from '../../constants/colors';
import { JournalContext } from '../../utils/JournalContext'; // Import JournalContext

const PromptAnswerScreen = ({ navigation, route }) => {
  const [text, setText] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(true);
  const [journalLoading, setJournalLoading] = useState(false);
  const [questionId, setQuestionId] = useState(null);
  const { email, rsQuality, selectedFriends } = route.params;

  const { setShouldRefresh, setHasAddedJournalEntryThisWeek } = useContext(JournalContext); // Destructure necessary functions from context

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

      const currentDate = new Date();
      const formattedDate = format(currentDate, 'yyyyMMddHHmmss');

      await setDoc(doc(journalCollectionRef, formattedDate), {
        Date: currentDate.toISOString(),
        Quality: rsQuality,
        FriendsSelected: selectedFriends,
        Question: question,
        WordEntry: text
      });

      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentXP = userData.XP || 0;

        const newXP = currentXP + 100;
        await updateDoc(userDocRef, {
          XP: newXP,
        });

        if (questionId) {
          await updateDoc(userDocRef, {
            [`questions.${questionId}.answered`]: true
          });
        }
      }

      // Check if the entry is for the current week
      const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
      if (isSameWeek(currentDate, currentWeekStart, { weekStartsOn: 0 })) {
        setHasAddedJournalEntryThisWeek(true); // Set hasAddedJournalEntryThisWeek to true
      }

      setShouldRefresh(true); // Set shouldRefresh to true

      Alert.alert(
        "Success",
        "Journal entry added successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              setText('');
              navigation.navigate('Journal', { email });
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
          <ActivityIndicator size="large" color={Colors.white500} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.avoidingView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={30} color={Colors.white500} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{question}</Text>
          <TouchableOpacity onPress={() => fetchUnansweredQuestions(email)} style={styles.refreshButton}>
            <Icon name="refresh" size={30} color={Colors.white500} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Start writing..."
          placeholderTextColor={Colors.white700}
          multiline
          value={text}
          onChangeText={setText}
        />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.checkButton} onPress={addJournalEntry}>
            <Icon name="check" size={30} color={Colors.white500} />
          </TouchableOpacity>
        </View>
        {journalLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={Colors.white500} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green500,
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
    marginVertical: 8,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    color: Colors.white500,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  refreshButton: {
    padding: 10,
  },
  textInput: {
    flex: 1,
    color: Colors.white500,
    fontSize: 16,
    marginVertical: 8,
    padding: 10,
    backgroundColor: Colors.green700,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  checkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: Colors.green700,
    borderRadius: 25,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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

