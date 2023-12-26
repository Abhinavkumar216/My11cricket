import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/Auth/Login';
import OTP from '../screens/Auth/OTP';
import Register from '../screens/Auth/Register';
import GetStarted from '../screens/GetStarted';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{
        headerShown: false,
        headerStyle: {backgroundColor: '#181928'},
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'WorkSans-Medium',
          fontSize: 18,
        },
        animation: 'slide_from_right',
        animationDuration: 500,
        animationTypeForReplace: 'push',
      }}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="OTP" component={OTP} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
