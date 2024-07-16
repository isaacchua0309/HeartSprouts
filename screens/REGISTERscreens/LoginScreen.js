import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/colors';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { getFirebaseApp } from '../../utils/firebaseHelper';
import { FriendsContext } from '../../utils/FriendsContext';
import { JournalContext } from '../../utils/JournalContext';

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { fetchFriends, setLoading: setFriendsLoading } = useContext(FriendsContext);
  const { fetchJournalData, setLoading: setJournalLoading } = useContext(JournalContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const app = getFirebaseApp();
  const auth = getAuth(app);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      setFriendsLoading(true);
      setJournalLoading(true);

      await Promise.all([fetchFriends(email), fetchJournalData(email)]);

      setFriendsLoading(false);
      setJournalLoading(false);
      setLoading(false);

      Alert.alert('Log In Successful', 'Glad to have you back!');
      navigation.navigate('Home', { email });
    } catch (error) {
      setLoading(false);
      setError(error.message);
      Alert.alert('Log In Failed', 'Please Check Email and Password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
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
        />
        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor={Colors.white700}
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon name={passwordVisible ? "eye-off" : "eye"} size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          <TouchableOpacity  onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.resetPassword}> Reset Password</Text>
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {loading ? (
          <ActivityIndicator size="large" color={Colors.white500} />
        ) : (
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green500,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: Colors.white500,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 36,
    fontWeight: 'bold'
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
