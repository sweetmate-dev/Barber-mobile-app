import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'native-base';
import {BarText, H5, BarIcon} from '../../../components/styled/Text';
import {RootView, BarContent, BarView} from '../../../components/styled/View';
import {BarButton} from '../../../components/styled/Button';
import {BarHeader, BarImage} from '../../../components/common';
import {dySize} from '../../../utils/responsive';
import {Chair, Welcome} from '../../../assets/images';
import {Colors} from '../../../themes';
import NavigationService from '../../../navigation/NavigationService';

const HomeScreen = () => {
  return (
    <RootView justify="flex-start">
      <BarHeader
        title={<H5 weight="bold">HOME</H5>}
        hasBack={false}
        hasRight
        rightIconType="AntDesign"
        rightIcon="bells"
      />
      <BarContent style={{padding: dySize(10)}}>
        <BarImage image={Welcome} width={355} height={250} />

        <LinearGradient
          colors={['#00000055', '#000000CC', '#000000FF']}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            height: dySize(250),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BarImage round image={Welcome} />
          <H5 weight="bold">Tian Li</H5>
        </LinearGradient>
        <BarView row justify="space-between" align="center">
          <H5 weight="bold">MY BARBERS</H5>
          <BarButton onPress={() => NavigationService.navigate('TabSearch')}>
            <BarIcon type="AntDesign" name="search1" color={Colors.outline} />
          </BarButton>
        </BarView>
      </BarContent>
    </RootView>
  );
};

export default HomeScreen;
