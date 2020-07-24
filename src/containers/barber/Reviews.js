import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {BarText, H5} from '../../components/styled/Text';
import {RootView} from '../../components/styled/View';
import {Colors} from '../../themes';

const BarberReviewScreen = () => {
  return (
    <RootView justify="flex-start">
      <H5 mt={30} color={Colors.placeholder}>
        You have no reviews now
      </H5>
    </RootView>
  );
};

export default BarberReviewScreen;
