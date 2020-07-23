import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {WaveIndicator} from 'react-native-indicators';

import {ABSView} from '../components/styled/View';
import {Colors} from '../themes';
import AuthStack from '../containers/auth';
import HomeStack from '../containers/home';
import NavigationService from './NavigationService';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer ref={(ref) => NavigationService.setNavigator(ref)}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="authStack" component={AuthStack} />
        <Stack.Screen name="homeStack" component={HomeStack} />
      </Stack.Navigator>
      {/* <ABSView>
        <WaveIndicator color={Colors.red} />
      </ABSView> */}
    </NavigationContainer>
  );
};

export default RootNavigator;
