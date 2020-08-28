import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BarberProfileScreen from './Profile';
import EditServiceScreen from './EditService';

const Stack = createStackNavigator();

const BarberProfileStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="BarberProfile" component={BarberProfileScreen} />
      <Stack.Screen name="EditService" component={EditServiceScreen} />
    </Stack.Navigator>
  );
};

export default BarberProfileStack;
