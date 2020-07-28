import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import NavigationService from './NavigationService';
import AuthStack from '../containers/auth';
import TabStack from '../containers/home';
import BarberProfile from '../containers/others/BarberProfile';
import BookingScreen from '../containers/others/Booking';
import BookingDateScreen from '../containers/others/BookingDate';
import {Context as AuthContext} from '../context/authContext';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {state} = useContext(AuthContext);
  const makeApolloClient = (authToken) => {
    return new ApolloClient({
      uri: 'https://thebarbapp.herokuapp.com/v1/graphql',
      headers: {
        'x-hasura-admin-secret': 'SuperSecretAminSecret2020!',
        Authorization: `Bearer ${authToken}`,
      },
      cache: new InMemoryCache(),
    });
  };
  return (
    <NavigationContainer ref={(ref) => NavigationService.setNavigator(ref)}>
      <ApolloProvider client={makeApolloClient(state.JWTToken)}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="TabStack" component={TabStack} />
          <Stack.Screen name="BarberProfile" component={BarberProfile} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="BookingDate" component={BookingDateScreen} />
        </Stack.Navigator>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default RootNavigator;
