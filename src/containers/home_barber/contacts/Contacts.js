import React from 'react';
import {FlatList, Dimensions} from 'react-native';
import {H5, H6} from '../../../components/styled/Text';
import {RootView, BarContent, BarView} from '../../../components/styled/View';
import {dySize} from '../../../utils/responsive';
import {BarHeader} from '../../../components/common';
import {Colors} from '../../../themes';
import {BarButton} from '../../../components/styled/Button';
import NavigationService from '../../../navigation/NavigationService';

const {height} = Dimensions.get('window');

const BarberContactScreen = () => {
  return (
    <RootView justify="flex-start" align="flex-start">
      <BarHeader
        leftIconType="Ionicons"
        leftIcon="ios-logo-rss"
        onPressBack={() => NavigationService.navigate('ClientBlast')}
        title={<H5 weight="bold">CLIENTS</H5>}
      />
      <FlatList
        ListEmptyComponent={
          <BarView
            align="center"
            width={375}
            style={{marginTop: height / 2 - 150}}>
            <H5 weight="bold" color={Colors.placeholder}>
              You have no clients
            </H5>
            <H6 color={Colors.placeholder} align="center">
              Clients that book an appointment with you will show up here.
            </H6>
            <BarButton>
              <H5 color={Colors.outline} weight="bold">
                INVITE CLIENTS
              </H5>
            </BarButton>
          </BarView>
        }
      />
    </RootView>
  );
};

export default BarberContactScreen;
