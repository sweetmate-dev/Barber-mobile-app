import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import HomeStack from './home';
import BookStack from './book';
import SearchStack from './search';
import SettingStack from './settings';
import {Colors} from '../../themes';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.outline,
        inactiveTintColor: 'rgba(255, 255, 255, 0.4)',
        showLabel: false,
        style: {
          backgroundColor: Colors.background,
          height: 80,
        },
        tabStyle: {
          borderTopWidth: 1,
          borderColor: Colors.outline,
        },
      }}
      backBehavior="none" // not handle back button
      headerMode="none">
      <Tab.Screen
        name="TabHome"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon type="AntDesign" name="home" style={{color}} />
          ),
        }}
      />
      <Tab.Screen
        name="TabBook"
        component={BookStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon type="AntDesign" name="calendar" style={{color}} />
          ),
        }}
      />
      <Tab.Screen
        name="TabSearch"
        component={SearchStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon type="AntDesign" name="search1" style={{color}} />
          ),
        }}
      />
      <Tab.Screen
        name="TabSetting"
        component={SettingStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon type="AntDesign" name="setting" style={{color}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
