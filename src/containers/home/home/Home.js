import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {H5, BarIcon} from '../../../components/styled/Text';
import {RootView, BarContent, BarView} from '../../../components/styled/View';
import {BarButton} from '../../../components/styled/Button';
import {BarHeader, BarImage} from '../../../components/common';
import {dySize} from '../../../utils/responsive';
import {Welcome, Jacket, Face} from '../../../assets/images';
import {Colors} from '../../../themes';
import NavigationService from '../../../navigation/NavigationService';
import MyBarberItem from './MyBarberItem';
import {Context as AuthContext} from '../../../context/authContext';

const MyBarbers = [
  {
    id: 1,
    image: Jacket,
    name: 'Matthew Sadler',
  },
  {
    id: 2,
    image: Face,
    name: 'Cintia Yasuo',
  },
];

const MyCuts = [
  {
    id: 1,
    image: Jacket,
  },
  {
    id: 2,
    image: Face,
  },
];

const HomeScreen = () => {
  const {state} = useContext(AuthContext);
  const onPressAddCut = () => {
    // open image picker
  };
  return (
    <RootView justify="flex-start">
      <BarHeader
        title={<H5 weight="bold">HOME</H5>}
        hasBack={false}
        hasRight
        rightIconType="AntDesign"
        rightIcon="bells"
      />
      <BarContent
        style={{padding: dySize(10)}}
        contentContainerStyle={{paddingBottom: 100}}>
        <BarImage image={{uri: state.user.avatar}} width={355} height={250} />
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
          <BarImage round image={{uri: state.user.avatar}} />
          <H5 weight="bold">{state.user.name}</H5>
        </LinearGradient>

        <BarView row justify="space-between" align="center">
          <H5 weight="bold">MY BARBERS</H5>
          <BarButton onPress={() => NavigationService.navigate('TabSearch')}>
            <BarIcon type="AntDesign" name="search1" color={Colors.outline} />
          </BarButton>
        </BarView>

        <BarView row wrap>
          {MyBarbers.map((barber) => (
            <MyBarberItem key={barber.id} user={barber} />
          ))}
        </BarView>

        <BarView row justify="space-between" align="center">
          <H5 weight="bold">MY CUTS</H5>
          {MyCuts.length > 0 && (
            <BarButton onPress={onPressAddCut}>
              <BarIcon type="AntDesign" name="plus" color={Colors.outline} />
            </BarButton>
          )}
        </BarView>

        <BarView row wrap>
          {MyCuts.map((barber) => (
            <BarView mr={4} ml={4} key={barber.id}>
              <BarImage image={barber.image} width={170} height={170} />
            </BarView>
          ))}
        </BarView>
      </BarContent>
    </RootView>
  );
};

export default HomeScreen;
