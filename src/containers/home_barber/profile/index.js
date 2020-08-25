import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BarberProfileScreen from './Profile';

const Stack = createStackNavigator();

const BarberProfileStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="BarberProfile" component={BarberProfileScreen} />
    </Stack.Navigator>
  );
};

export default BarberProfileStack;
