import React from 'react';
import {BarButton} from '../../../components/styled/Button';
import {Colors} from '../../../themes';
import {BarImage} from '../../../components/common';
import {BarView} from '../../../components/styled/View';
import {H5, H6} from '../../../components/styled/Text';

const BarberItem = ({
  onPress = () => {},
  showTitle = true,
  showLocation = true,
  user,
}) => {
  return (
    <BarButton
      background={Colors.card}
      onPress={onPress}
      height={80}
      row
      align="center"
      justify="flex-start"
      br={4}
      mb={5}>
      <BarImage image={{uri: user.avatar}} width={60} height={60} round />
      <BarView ml={10}>
        <H5 pv={2}>{user.name}</H5>
        {showTitle && (
          <H6 pv={2} color={Colors.placeholder}>
            {user.title}
          </H6>
        )}
        {showLocation && (
          <H6 pv={2} color={Colors.placeholder}>
            {user.location}
          </H6>
        )}
      </BarView>
    </BarButton>
  );
};

export default BarberItem;
