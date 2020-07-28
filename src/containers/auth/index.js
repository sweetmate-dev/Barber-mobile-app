import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './Welcome';
import AuthScreen from './Auth';
import VerifyEmailScreen from './VerifyEmail';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
