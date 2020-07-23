import React, {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Container} from 'native-base';
import RootNavigator from './RootNavigation';

const AppWithNav = () => {
  const [appState, setAppState] = useState(AppState.currentState);

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

  return (
    <Container>
      <RootNavigator />
    </Container>
  );
};

export default AppWithNav;
