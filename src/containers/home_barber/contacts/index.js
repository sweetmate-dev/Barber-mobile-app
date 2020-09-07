import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BarberContactScreen from './Contacts';
import ClientBlastScreen from './ClientBlast';

const Stack = createStackNavigator();

const BarberContactStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="BarberContacts" component={BarberContactScreen} />
      <Stack.Screen name="ClientBlast" component={ClientBlastScreen} />
    </Stack.Navigator>
  );
};

export default BarberContactStack;
