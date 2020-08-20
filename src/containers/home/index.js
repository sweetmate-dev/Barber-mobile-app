import React, {useEffect, useContext} from 'react';
import {useMutation, useQuery} from '@apollo/client';
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
import {GET_FAVORITE_BARBERS} from '../../graphql/query';
import NavigationService from '../../navigation/NavigationService';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  const {state, dispatch} = useContext(AuthContext);
  useQuery(GET_FAVORITE_BARBERS, {
    variables: {user_id: state.user.id},
  });

  const [updateUserId] = useMutation(UPDATE_USER_ID, {
    onCompleted: (data) => {
      onUpdatedUserId(data.update_users);
    },
  });
  const [updateBarberId] = useMutation(UPDATE_BARBER_ID, {
    onCompleted: ({data}) => {
      onUpdatedUserId(data.update_barbers);
    },
  });

  useEffect(() => {
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
  }, []);

  onUpdatedUserId = (data) => {
    if (data.returning.length > 0) {
      dispatch({type: 'saveUser', payload: data.returning[0]});
    } else {
      NavigationService.reset('AuthStack');
    }
  };

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
