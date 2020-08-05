import React from 'react';
import {BarButton} from '../../../components/styled/Button';
import {Colors} from '../../../themes';
import {BarImage} from '../../../components/common';
import {BarView} from '../../../components/styled/View';
import {H5, H6, BarIcon} from '../../../components/styled/Text';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const BarberItem = ({
  onPress = () => {},
  showTitle = true,
  showLocation = true,
  user,
  hasCallButton = false,
}) => {
  callBarber = () => {
    alert(`Calling ${user.phone}`);
  };
  return (
    <BarView
      row
      align="center"
      background={Colors.card}
      height={80}
      br={4}
      mb={5}>
      <BarButton
        onPress={onPress}
        row
        align="center"
        justify="flex-start"
        style={{flex: 1}}>
        <BarImage image={{uri: user.avatar}} width={60} height={60} round />
        <BarView ml={10} style={{flex: 1}}>
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
      {hasCallButton && (
        <BarButton
          width={40}
          height={40}
          br={20}
          ml={10}
          mr={10}
          onPress={callBarber}
          background={Colors.outline}>
          <BarIcon type="AntDesign" name="phone" color={Colors.background} />
        </BarButton>
      )}
    </BarView>
  );
};

export default BarberItem;
