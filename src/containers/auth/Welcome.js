import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationService from '../../navigation/NavigationService';
import {Welcome, Location} from '../../assets/images';
import {Colors} from '../../themes';
import BarImage from '../../components/common/BarImage';
import {BarButton} from '../../components/styled/Button';
import {BarText, H3, H5} from '../../components/styled/Text';
import {RootView, BarView, ABSView} from '../../components/styled/View';

const Stack = createStackNavigator();

const Login = ({navigation}) => {
  return (
    <RootView justify="space-between" align="center" width={375}>
      <ABSView>
        <BarImage image={Welcome} style={{height: '100%', width: '100%'}} />
      </ABSView>
      <BarView mt={70}>
        <BarImage image={Location} resizeMode="contain" />
        <H3 weight="bold" color={Colors.background}>
          BARBAPP
        </H3>
      </BarView>
      <BarView>
        <BarButton
          mb={30}
          br={25}
          height={50}
          width={300}
          background={Colors.red}
          onPress={() => navigation.navigate('Auth', {initialIndex: 0})}>
          <H5 weight="bold">LOGIN</H5>
        </BarButton>
        <BarButton
          mb={30}
          br={25}
          height={50}
          width={300}
          background={Colors.gray}
          onPress={() => NavigationService.navigate('Auth', {initialIndex: 1})}>
          <H5 weight="bold">REGISTER</H5>
        </BarButton>
      </BarView>
    </RootView>
  );
};

export default Login;
