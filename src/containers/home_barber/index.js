import React, {useEffect, useContext} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import * as _ from 'lodash';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import BarberProfileStack from './profile';
import BarberNotificationStack from './notifications';
import BarberBookStack from './book';
import BarberContactStack from './contacts';
import BarberSettingStack from './settings';
import {Colors} from '../../themes';
import {Context as AuthContext} from '../../context/authContext';
import {UPDATE_BARBER_ID} from '../../graphql/mutation';
import NavigationService from '../../navigation/NavigationService';

const Tab = createBottomTabNavigator();

const BarberTabStack = () => {
  const {state, dispatch} = useContext(AuthContext);

  const [updateBarberId] = useMutation(UPDATE_BARBER_ID, {
    onCompleted: (data) => {
      onUpdatedUserId(data.update_barbers);
    },
  });

  useEffect(() => {
    // update user id from email to sub id for new users
    updateBarberId({
      variables: {email: state.user.email, id: state.user.sub},
    });
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
        name="BarberProfile"
        component={BarberProfileStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="ios-person" style={{color}} />,
        }}
      />
      <Tab.Screen
        name="BarberNotification"
        component={BarberNotificationStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="ios-notifications-outline" style={{color}} />
          ),
        }}
      />
      <Tab.Screen
        name="BarberBook"
        component={BarberBookStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="ios-calendar" style={{color}} />,
        }}
      />
      <Tab.Screen
        name="BarberContact"
        component={BarberContactStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon type="FontAwesome" name="address-book" style={{color}} />
          ),
        }}
      />
      <Tab.Screen
        name="BarberSetting"
        component={BarberSettingStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon type="AntDesign" name="setting" style={{color}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BarberTabStack;
