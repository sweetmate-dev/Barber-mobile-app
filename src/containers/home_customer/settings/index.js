import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingScreen from './Settings';

const Stack = createStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Settings" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default SettingStack;
