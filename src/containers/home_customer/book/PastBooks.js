import React from 'react';
import moment from 'moment';
import {H5, H6, BarIcon} from '../../../components/styled/Text';
import {RootView, BarView} from '../../../components/styled/View';
import {FlatList} from 'react-native-gesture-handler';
import {Colors} from '../../../themes';
import {BarImage} from '../../../components/common';
import {BarButton} from '../../../components/styled/Button';
import NavigationService from '../../../navigation/NavigationService';

const PastBookScreen = ({bookings}) => {
  const onBookAgain = (user) => {
    NavigationService.navigate('BarberProfile', {
      barber: user,
      initialIndex: 2,
    });
  };
  const _renderBookingItem = ({item}) => {
    const book = item;
    const barber = book.barber;
    if (moment(book.time).isAfter()) return null;
    return (
      <BarView
        row
        align="center"
        br={4}
        background={Colors.card}
        mt={4}
        key={book.id}
        width={365}>
        <BarButton
          row
          onPress={() => {}}
          align="center"
          padding={10}
          key={book.id}
          style={{flex: 1}}>
          <BarImage image={{uri: barber.avatar}} width={60} height={60} round />
          <BarView ml={10} style={{flex: 1}}>
            <H5 pv={2}>{moment(book.time).format('YYYY-MM-DD HH:mm A')}</H5>
            <H6 pv={2} color={Colors.outline}>
              {barber.name}
            </H6>
            <H6 pv={2} color={Colors.placeholder}>
              {barber.location}
            </H6>
          </BarView>
        </BarButton>
        <BarButton
          width={40}
          height={40}
          br={20}
          ml={10}
          mr={10}
          onPress={() => onBookAgain(barber)}
          background={Colors.outline}>
          <BarIcon type="AntDesign" name="calendar" color={Colors.background} />
        </BarButton>
      </BarView>
    );
  };
  return (
    <RootView>
      <FlatList
        contentContainerStyle={{paddingBottom: 40}}
        data={bookings}
        renderItem={_renderBookingItem}
        keyExtractor={(item) => item.id}
      />
    </RootView>
  );
};

export default PastBookScreen;
