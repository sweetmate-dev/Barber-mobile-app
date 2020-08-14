import React, {useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useQuery} from '@apollo/react-hooks';
import NavigationService from './NavigationService';
import AuthStack from '../containers/auth';
import TabStack from '../containers/home';
import BarberProfile from '../containers/others/BarberProfile';
import BookingScreen from '../containers/others/Booking';
import BookingDateScreen from '../containers/others/BookingDate';
import EditAccountScreen from '../containers/others/EditAccount';
import {Context as AuthContext} from '../context/authContext';
import {GET_MY_BOOKINGS, GET_BARBERS} from '../graphql/query';
import {showLoading, hideLoading} from '../services/operators';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {state, dispatch} = useContext(AuthContext);
  const [tabIndex, setTabIndex] = useState(0);
  const [token, setToken] = useState('loading');
  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    if (user) dispatch({type: 'saveUser', payload: JSON.parse(user)});
    if (!token) setToken('');
    else {
      showLoading('Loading...');
      dispatch({type: 'saveJWTToken', payload: token});
      setTimeout(() => {
        hideLoading();
        setToken(token || '');
      }, 1500);
    }
  }, []);

  const getMyBooks = useQuery(GET_MY_BOOKINGS, {
    variables: {user_id: state.user.id},
  });
  const searchBarbers = useQuery(GET_BARBERS);

  const onStateChanged = (navigationState) => {
    const LastRoute = navigationState.routes[navigationState.routes.length - 1];
    if (LastRoute.state) {
      if (LastRoute.state.index === tabIndex || !state.user) return;

      setTabIndex(LastRoute.state.index);
      switch (LastRoute.state.index) {
        case 0:
          break;
        case 1:
          getMyBooks && getMyBooks.refetch();
          break;
        case 2:
          searchBarbers && searchBarbers.refetch();
          break;
        case 3:
          break;
        default:
      }
    } else {
      // screens which are not in tab stack
    }
  };
  if (token === 'loading') return null;
  return (
    <NavigationContainer
      ref={(ref) => NavigationService.setNavigator(ref)}
      onStateChange={onStateChanged}>
      <Stack.Navigator
        headerMode="none"
        initialRouteName={token.length > 0 ? 'TabStack' : 'AuthStack'}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="TabStack" component={TabStack} />
        <Stack.Screen name="BarberProfile" component={BarberProfile} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="BookingDate" component={BookingDateScreen} />
        <Stack.Screen name="EditAccount" component={EditAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
