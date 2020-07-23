import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BarText} from '../../components/styled/Text';

const Stack = createStackNavigator();

const HomeScreen = () => {
  return <BarText color="red">Home</BarText>;
};

export default HomeScreen;
