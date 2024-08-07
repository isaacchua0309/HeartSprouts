import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/colors';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { getFirebaseApp } from '../../utils/firebaseHelper';
import { JournalContext } from '../../utils/JournalContext';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import { firestore } from '../../utils/firebaseHelper';

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { fetchJournalData, setLoading: setJournalLoading } = useContext(JournalContext);

  const fetchUserData = async (email) => {
    try {
      const userDoc = await getDoc(doc(firestore, 'Users', email));
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        throw new Error('User document does not exist.');
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
      throw new Error('There was an error fetching user data. Please try again later.');
    }
  };

  const fetchFriends = async (email) => {
    try {
      const friendsCollectionRef = collection(firestore, `Users/${email}/Friends`);
      const querySnapshot = await getDocs(friendsCollectionRef);
      const friendsList = querySnapshot.docs
        .filter(doc => doc.id !== 'Friends Init')
        .map(doc => ({ id: doc.id, ...doc.data() }));
      return friendsList;
    } catch (error) {
      console.error('Error fetching friends: ', error);
      throw new Error('There was an error fetching friends. Please try again later.');
    }
  };

  const scheduleUpcomingEventNotifications = async (email, friends) => {
    try {
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      const existingNotificationIds = new Set(scheduledNotifications.map(notification => notification.identifier));

      for (const friend of friends) {
        const eventsCollectionRef = collection(firestore, `Users/${email}/Friends/${friend.id}/Events`);
        const querySnapshot = await getDocs(eventsCollectionRef);

        for (const eventDoc of querySnapshot.docs) {
          const event = eventDoc.data();
          if (event.date && event.date.seconds) {
            const eventDate = new Date(event.date.seconds * 1000);
            if (eventDate > new Date() && eventDoc.id !== 'EventsInit') {
              let notificationId = event.notificationId;

              if (!notificationId || !existingNotificationIds.has(notificationId)) {
                if (notificationId) {
                  await Notifications.cancelScheduledNotificationAsync(notificationId);
                }

                notificationId = await Notifications.scheduleNotificationAsync({
                  content: {
                    title: `${event.title} with ${friend.id}`,
                    body: `Don't forget ${event.title}!`,
                  },
                  trigger: {
                    date: eventDate,
                  },
                });

                // Save the notification ID in Firestore
                await updateDoc(eventDoc.ref, { notificationId });
              } else {
                // Reschedule the notification with the same ID
                await Notifications.scheduleNotificationAsync({
                  identifier: notificationId,
                  content: {
                    title: `${event.title} with ${friend.id}`,
                    body: `Don't forget ${event.title}!`,
                  },
                  trigger: {
                    date: eventDate,
                  },
                });
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error scheduling notifications: ', error);
      Alert.alert('Error', 'There was an error scheduling event notifications. Please try again.');
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      setJournalLoading(true);

      const friends = await fetchFriends(email);
      await fetchJournalData(email);

      // Fetch user data including the level
      const userData = await fetchUserData(email);

      // Clear all scheduled notifications
      await Notifications.cancelAllScheduledNotificationsAsync();

      console.log("Scheduling notifications for user:", email);
      await scheduleUpcomingEventNotifications(email, friends);

      setLoading(false);

      Alert.alert('Log In Successful', 'Glad to have you back!');
      navigation.navigate('Home', { email, level: userData.level });
    } catch (error) {
      setLoading(false);
      setError(error.message);
      Alert.alert('Log In Failed', 'Please Check Email and Password');
    } finally {
      setLoading(false);
      setJournalLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const app = getFirebaseApp();
  const auth = getAuth(app);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton} testID="goBackButton">
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.body}>
        <View style={styles.contentContainer}>
          <ImageBackground source={require('../../assets/HeartSproutsWORD.png')} style={styles.firstimage} />
          <ImageBackground source={require('../../assets/somesprouts.png')} style={styles.secondimage} />
        </View>

        <TextInput 
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.white700}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          testID="emailInput"
        />
        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor={Colors.white700}
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            testID="passwordInput"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon name={passwordVisible ? "eye-off" : "eye"} size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.resetPassword}> Reset Password</Text>
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {loading ? (
          <ActivityIndicator size="large" color={Colors.white500} />
        ) : (
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} testID="signInButton">
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green500,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  body: {
    width: '80%',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstimage: {
    width: 300,
    height: 90,
    marginBottom: '35%',
  },
  secondimage: {
    width: 240, 
    height: 140, 
  },
  input: {
    backgroundColor: Colors.green700,
    color: '#FFFFFF',
    width: '100%',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green700,
    width: '100%',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    color: '#FFFFFF',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPassword: {
    fontWeight: 'bold',
    color: Colors.black300
  },
  resetPassword: {
    fontWeight: 'bold',
    color: Colors.white700
  },
  signInButton: {
    backgroundColor: Colors.white500,
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontWeight: 'semibold',
    color: Colors.white300,
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
});

export default LoginScreen;
