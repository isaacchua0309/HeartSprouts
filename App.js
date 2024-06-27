import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import GettingStartedScreen from './screens/GettingStartedScreen';
import NameInputScreen from './screens/NameInputScreen';
import BirthdayInputScreen from './screens/BirthdayInputScreen';
import EmailInputScreen from './screens/EmailInputScreen';
import PassWordInputScreen from './screens/PasswordInputScreen';
import CreationSuccessScreen from './screens/CreationSuccessScreen';
import LoginScreen from './screens/LoginScreen';
import UserProfilesScreen from './screens/UserProfilesScreen';
import HomeScreen from './screens/HomeScreen';

import Colors from './constants/colors';
import { store } from './store/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.rootScreen}>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Getting Started" component={GettingStartedScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Users" component={UserProfilesScreen} />
              <Stack.Screen name="Name Input" component={NameInputScreen} />
              <Stack.Screen name="Birthday Input" component={BirthdayInputScreen} />
              <Stack.Screen name="Email Input" component={EmailInputScreen} />
              <Stack.Screen name="Password Input" component={PassWordInputScreen} />
              <Stack.Screen name="Account Creation Successful" component={CreationSuccessScreen} />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootScreen: {
    flex: 1,
    backgroundColor: Colors.green500,
  },
});

