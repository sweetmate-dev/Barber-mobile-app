import React from 'react';
import {YellowBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Amplify from 'aws-amplify';
import {Provider as AuthProvider} from './context/authContext';
import config from '../aws-exports';

import AppWithNav from './navigation/AppWithNav';

import './i18next';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
console.disableYellowBox = true;

Amplify.configure(config);

const BarbApp = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <AppWithNav />
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default BarbApp;
