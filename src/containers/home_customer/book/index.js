import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BookScreen from './Book';

const Stack = createStackNavigator();

const BookStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Book" component={BookScreen} />
    </Stack.Navigator>
  );
};

export default BookStack;
