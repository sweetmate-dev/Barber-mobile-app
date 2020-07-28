import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker, GOOGLE_PROVIDER} from 'react-native-maps';
import {BarText, BarIcon, H6, H5} from '../../components/styled/Text';
import {RootView, BarView, BarContent} from '../../components/styled/View';
import {BarButton} from '../../components/styled/Button';
import {Colors} from '../../themes';
import {dySize} from '../../utils/responsive';
import {BarImage, BarIconButton} from '../../components/common';

const BarberProfileActions = [
  {action: 'book', icon: 'calendar'},
  {action: 'review', icon: 'staro'},
  {action: 'share', icon: 'sharealt'},
];

const photos = [
  'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
  'https://homepages.cae.wisc.edu/~ece533/images/baboon.png',
  'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
];

const BarberInfoScreen = ({barber}) => {
  const onPressAction = (action) => {
    switch (action) {
      case 'book':
        console.log('book');
        break;
      case 'review':
        console.log('review');
        break;
      case 'share':
        console.log('share');
        break;
      default:
    }
  };

  callBarber = () => {};

  chatBarber = () => {};
  console.log(barber.phone);

  return (
    <RootView justify="flex-start" align="flex-start">
      <BarView
        row
        justify="space-between"
        width={375}
        background={Colors.card}
        ph={30}>
        {BarberProfileActions.map(({action, icon}) => (
          <BarButton key={action} onPress={() => onPressAction(action)}>
            <BarView
              background={Colors.background}
              width={30}
              height={30}
              justify="center"
              align="center"
              br={15}>
              <BarIcon
                type="AntDesign"
                name={icon}
                color={Colors.outline}
                size={15}
              />
            </BarView>
            <H6 color={Colors.outline}>{action.toUpperCase()}</H6>
          </BarButton>
        ))}
      </BarView>

      <BarContent contentContainerStyle={{padding: dySize(10)}}>
        <H6 weight="bold">INFO</H6>
        <BarView row align="center">
          <BarIcon
            type="AntDesign"
            name="phone"
            size={15}
            color={Colors.outline}
          />
          <H6 style={{flex: 1}}>{barber.phone || 'No phone number'}</H6>
          {barber.phone.length > 0 && (
            <>
              <BarIconButton onPress={callBarber} icon="phone" mr={10} />
              <BarIconButton onPress={chatBarber} icon="message1" />
            </>
          )}
        </BarView>

        <H6 weight="bold" mt={20}>
          LOCATION & HOURS
        </H6>
        <BarView height={200} width={355} background="white">
          <MapView
            provider={GOOGLE_PROVIDER}
            style={{...StyleSheet.absoluteFillObject}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{latitude: 37.79225, longitude: -122.4024}}
              title="Barber Shop"
              description="This is my location"
            />
          </MapView>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#000000FF', '#000000CC', '#00000055']}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              height: dySize(200),
            }}>
            <H5>{barber.title}</H5>
            <H5 color={Colors.placeholder}>{barber.location}</H5>
          </LinearGradient>
        </BarView>

        <H6 weight="bold" mt={20}>
          PHOTOS
        </H6>
        <BarView row wrap>
          {photos.map((photo) => (
            <BarView mr={4} ml={4} mb={8} key={photo}>
              <BarImage image={{uri: photo}} width={170} height={170} />
            </BarView>
          ))}
        </BarView>
      </BarContent>
    </RootView>
  );
};

export default BarberInfoScreen;
