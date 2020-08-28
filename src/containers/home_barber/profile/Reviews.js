import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {H5, H6} from '../../../components/styled/Text';
import {RootView, BarContent, BarView} from '../../../components/styled/View';
import {dySize} from '../../../utils/responsive';
import {Colors} from '../../../themes';

const BarberReviewScreen = () => {
  return (
    <RootView justify="flex-start" align="flex-start">
      <FlatList
        ListEmptyComponent={
          <BarView align="center" mt={200} width={375}>
            <H5 weight="bold" color={Colors.placeholder}>
              You have no reviews yet
            </H5>
            <H6 color={Colors.placeholder} align="center">
              Clients can review your service once they have completed an
              appointment with you.
            </H6>
          </BarView>
        }
      />
    </RootView>
  );
};

export default BarberReviewScreen;
