import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BarImage} from '../../../components/common';
import {BarView} from '../../../components/styled/View';
import {H5} from '../../../components/styled/Text';
import {dySize} from '../../../utils/responsive';
import {Welcome, Jacket} from '../../../assets/images';

const MyBarberItem = ({user}) => {
  return (
    <BarView
      key={user.id}
      width={170}
      height={170}
      mr={4}
      ml={4}
      justify="center"
      align="center">
      <BarImage width={170} height={170} image={user.image} />
      <LinearGradient
        colors={['#00000055', '#000000CC', '#000000FF']}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          height: dySize(170),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BarImage round image={user.image} width={70} height={70} />
        <H5 weight="bold">{user.name}</H5>
      </LinearGradient>
    </BarView>
  );
};

export default MyBarberItem;
