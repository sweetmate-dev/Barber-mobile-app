import React, {useState, useEffect, useContext} from 'react';
import {AppState} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {Container} from 'native-base';
import RootNavigator from './RootNavigation';
import {Context as AuthContext} from '../context/authContext';
import {Colors} from '../themes';

const AppWithNav = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  const {state} = useContext(AuthContext);
  useEffect(() => {
    AppState.addEventListener('change', this._handleAppStateChange);
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    // remove listener before component is destroyed
    return () => {
      AppState.removeEventListener('change', this._handleAppStateChange);
    };
  }, []);

  _handleAppStateChange = (nextAppState) => {
    if (appState.match(/active/) && nextAppState === 'inactive') {
      console.log('App has come to the foreground!');
    }
    setAppState(nextAppState);
  };

  const makeApolloClient = (authToken) => {
    return new ApolloClient({
      uri: 'https://thebarbapp.herokuapp.com/v1/graphql',
      headers: {
        'x-hasura-admin-secret': 'SuperSecretAminSecret2020!',
      },
      cache: new InMemoryCache(),
    });
  };

  return (
    <ApolloProvider client={makeApolloClient(state.JWTToken)}>
      <Container style={{backgroundColor: Colors.background}}>
        <RootNavigator />
      </Container>
    </ApolloProvider>
  );
};

export default AppWithNav;
