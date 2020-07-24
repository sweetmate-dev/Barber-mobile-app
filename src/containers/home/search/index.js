import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from './Search';
import SearchInputScreen from './SearchInput';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SearchInput" component={SearchInputScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
