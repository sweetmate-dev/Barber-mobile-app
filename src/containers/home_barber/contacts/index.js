import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BarberContactScreen from './Contacts';

const Stack = createStackNavigator();

const BarberContactStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="BarberContacts" component={BarberContactScreen} />
    </Stack.Navigator>
  );
};

export default BarberContactStack;
