import React, {useEffect, useContext} from 'react';
import {useMutation} from '@apollo/client';
import * as _ from 'lodash';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import HomeStack from './home';
import BookStack from './book';
import SearchStack from './search';
import SettingStack from './settings';
import {Colors} from '../../themes';
import {Context as AuthContext} from '../../context/authContext';
import {UPDATE_USER_ID, UPDATE_BARBER_ID} from '../../graphql/mutation';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  const {state, dispatch} = useContext(AuthContext);
  const [updateUserId, updatedUserData] = useMutation(UPDATE_USER_ID);
  const [updateBarberId, updatedBarberData] = useMutation(UPDATE_BARBER_ID);

  // update user id from email to sub id for new users
  if (state.user['custom:role'] === 'customer') {
    updateUserId({
      variables: {email: state.user.email, id: state.user.sub},
    });
  }

  if (state.user['custom:role'] === 'barber') {
    updateBarberId({
      variables: {email: state.user.email, id: state.user.sub},
    });
  }

  // get the latest user data and save to context reducer
  const updatedUser = _.get(
    updatedUserData,
    ['data', 'update_users', 'returning'],
    [],
  );
  if (state.user['custom:role'] === 'customer' && updatedUser.length > 0) {
    dispatch({type: 'saveUser', payload: updatedUser[0]});
  }

  const updatedBarber = _.get(
    updatedBarberData,
    ['data', 'update_users', 'returning'],
    [],
  );

  if (state.user['custom:role'] === 'barber' && !updatedBarber) {
    dispatch({type: 'saveUser', payload: updatedBarber[0]});
  }

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
