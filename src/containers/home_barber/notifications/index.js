import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BarberNotificationScreen from './Notification';

const Stack = createStackNavigator();

const BarberNotificationStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="BarberNotification"
        component={BarberNotificationScreen}
      />
    </Stack.Navigator>
  );
};

export default BarberNotificationStack;
