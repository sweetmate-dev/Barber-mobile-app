import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BarberBookScreen from './Book';

const Stack = createStackNavigator();

const BarberBookStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="BarberBook" component={BarberBookScreen} />
    </Stack.Navigator>
  );
};

export default BarberBookStack;
