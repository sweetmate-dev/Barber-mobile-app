import React from 'react';
import {FlatList, Dimensions} from 'react-native';
import {H5, H6} from '../../../components/styled/Text';
import {RootView, BarContent, BarView} from '../../../components/styled/View';
import {dySize} from '../../../utils/responsive';
import {BarHeader} from '../../../components/common';
import {Colors} from '../../../themes';

const {height} = Dimensions.get('window');

const BarberNotificationScreen = () => {
  return (
    <RootView justify="flex-start" align="flex-start">
      <BarHeader hasBack={false} title={<H5 weight="bold">NOTIFICATIONS</H5>} />
      <FlatList
        ListEmptyComponent={
          <BarView
            align="center"
            width={375}
            style={{marginTop: height / 2 - 120}}>
            <H5 weight="bold" color={Colors.placeholder}>
              You have no notifications
            </H5>
            <H6 color={Colors.placeholder} align="center">
              Your notifications will show up here.
            </H6>
          </BarView>
        }
      />
    </RootView>
  );
};

export default BarberNotificationScreen;
