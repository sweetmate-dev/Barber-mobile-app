import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BarberSettingScreen from './Settings';

const Stack = createStackNavigator();

const BarberSettingStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="BarberSettings" component={BarberSettingScreen} />
    </Stack.Navigator>
  );
};

export default BarberSettingStack;
