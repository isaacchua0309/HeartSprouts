import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import GettingStartedScreen from './screens/GettingStartedScreen';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NameInputScreen from './screens/NameInputScreen';
import BirthdayInputScreen from './screens/BirthdayInputScreen';
import EmailInputScreen from './screens/EmailInputScreen';
import PassWordInputScreen from './screens/PasswordInputScreen';
import CreationSuccessScreen from './screens/CreationSuccessScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <SafeAreaView style = {{flex:1}}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name = 'Getting Started' component = {GettingStartedScreen}/>
          <Stack.Screen name = 'Login' component = {LoginScreen}/>
          <Stack.Screen name = 'Name Input' component = {NameInputScreen}/>
          <Stack.Screen name = 'Birthday Input' component = {BirthdayInputScreen}/>
          <Stack.Screen name = 'Email Input' component = {EmailInputScreen}/>
          <Stack.Screen name = 'Password Input' component = {PassWordInputScreen}/>
          <Stack.Screen name = 'Account Creation Successful' component = {CreationSuccessScreen}/>
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
