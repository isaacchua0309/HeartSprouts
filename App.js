import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import GettingStartedScreen from './screens/REGISTERscreens/GettingStartedScreen';
import NameInputScreen from './screens/REGISTERscreens/NameInputScreen';
import BirthdayInputScreen from './screens/REGISTERscreens/BirthdayInputScreen';
import EmailInputScreen from './screens/REGISTERscreens/EmailInputScreen';
import PassWordInputScreen from './screens/REGISTERscreens/PasswordInputScreen';
import CreationSuccessScreen from './screens/REGISTERscreens/CreationSuccessScreen';
import LoginScreen from './screens/REGISTERscreens/LoginScreen';
import UserProfilesScreen from './screens/FRIENDSscreens/UserProfilesScreen';
import HomeScreen from './screens/HOMEscreens/HomeScreen';
import Colors from './constants/colors';
import { store } from './store/store';
import AddFriendScreen from './screens/FRIENDSscreens/AddFriendScreen'
import FriendProfileScreen from './screens/FRIENDSscreens/FriendProfileScreen';
import PromptScreen from './screens/JOURNALscreens/WeeklyReflectionScreen';
import PromptAnswerScreen from './screens/JOURNALscreens/PromptAnswerScreen';
import SatisfactionRatingScreen from './screens/JOURNALscreens/SatisfactionRatingScreen';
import RelationshipSatisfiedScreen from './screens/JOURNALscreens/RelationshipSatisfiedScreen';
const Stack = createStackNavigator();

const forFadeAndScale = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  }
});

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.rootScreen}>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Getting Started" component={GettingStartedScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={HomeScreen} options={{
                  cardStyleInterpolator: forFadeAndScale,
                }}/>
              <Stack.Screen name="Users" component={UserProfilesScreen} options={{
                  cardStyleInterpolator: forFadeAndScale,
                }}/>
              <Stack.Screen name="Friend Profile" component={FriendProfileScreen} />
              <Stack.Screen name="Friend Creation" component={AddFriendScreen} />
              <Stack.Screen name="Journal" component={PromptScreen} options={{
                  cardStyleInterpolator: forFadeAndScale,
                }}/>
              <Stack.Screen name="Satisfaction Rating" component={SatisfactionRatingScreen} />
              <Stack.Screen name="Relationships Satisfied" component={RelationshipSatisfiedScreen} />
              <Stack.Screen name="Prompt Answer" component={PromptAnswerScreen} />
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

