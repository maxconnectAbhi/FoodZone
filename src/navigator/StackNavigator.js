import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/HomeScreen";
import CheckoutScreen from "../screens/CheckoutScreen";


const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CheckOut" component={CheckoutScreen} options={{ title: 'Cart' }}/>
      </Stack.Navigator>
  );
}

export default StackNavigator;
