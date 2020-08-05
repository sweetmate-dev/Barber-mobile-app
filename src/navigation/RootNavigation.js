import React, {useContext, useState} from 'react';
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
import {GET_MY_BOOKINGS} from '../graphql/query';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {state} = useContext(AuthContext);
  const [tabIndex, setTabIndex] = useState(0);
  const getMyBooks = useQuery(GET_MY_BOOKINGS, {
    variables: {user_id: state.user.id},
  });

  const onStateChanged = (navigationState) => {
    const LastRoute = navigationState.routes[navigationState.routes.length - 1];
    if (LastRoute.state) {
      if (LastRoute.state.index === tabIndex || !state.user || !getMyBooks)
        return;

      setTabIndex(LastRoute.state.index);
      switch (LastRoute.state.index) {
        case 0:
          break;
        case 1:
          console.log('refetching...');
          getMyBooks.refetch();
          break;
        case 2:
          break;
        case 3:
          break;
        default:
      }
    } else {
      // screens which are not in tab stack
    }
  };
  return (
    <NavigationContainer
      ref={(ref) => NavigationService.setNavigator(ref)}
      onStateChange={onStateChanged}>
      <Stack.Navigator headerMode="none">
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
