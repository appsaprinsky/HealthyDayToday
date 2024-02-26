import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import HomeScreen from './screens/Homescreen';
import ProfileScreen from './screens/Profilescreen';
import ProfileeditScreen from './screens/Profileeditscreen';
import DashboardScreen from './screens/Dashboardscreen';
import EatenScreen from './screens/Eatenscreen';
import EatennewScreen from './screens/Eatennewscreen';
import AIScreen from './screens/AIscreen';
import AIpredictionScreen from './screens/AIpredictionscreen';
import SignUpScreen from './screens/Signup';
import SignInScreen from './screens/Signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator()


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Register!', headerStyle: {backgroundColor: '#323344',}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold',}, }}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile!', headerStyle: {backgroundColor: '#323344',}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold',}, }}/>
          <Stack.Screen name="Profileedit" component={ProfileeditScreen} options={{ title: 'Profile Edit!', headerStyle: {backgroundColor: '#323344',}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold',}, }}/>
          <Stack.Screen name="Eaten" component={EatenScreen} options={{ title: 'Calories Consumption!', headerStyle: {backgroundColor: '#323344',}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold',}, }}/>
          <Stack.Screen name="Eatennew" component={EatennewScreen} options={{ title: 'Calories Consumption add!', headerStyle: {backgroundColor: '#323344',}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold',}, }}/>
          <Stack.Screen name="AI" component={AIScreen} options={{ title: 'AI!', headerStyle: {backgroundColor: '#323344',}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold',}, }}/>
          <Stack.Screen name="AIprediction" component={AIpredictionScreen} options={{ title: 'Predictions', headerStyle: {backgroundColor: '#323344',}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold',}, }}/>
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard!', headerStyle: {backgroundColor: '#323344',}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold',}, }}/>

        </Stack.Navigator>
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
