import React from 'react';
import {YellowBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppWithNav from './navigation/AppWithNav';

import './i18next';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
console.disableYellowBox = true;

const BarbApp = () => {
  return (
    <SafeAreaProvider>
      <AppWithNav />
    </SafeAreaProvider>
  );
};

export default BarbApp;
