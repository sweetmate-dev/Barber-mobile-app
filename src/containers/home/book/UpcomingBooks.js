import React from 'react';
import moment from 'moment';
import ReadMore from 'react-native-read-more-text';
import {FlatList} from 'react-native-gesture-handler';
import {BarButton} from '../../../components/styled/Button';
import {H5, H6, BarIcon} from '../../../components/styled/Text';
import {RootView, BarView} from '../../../components/styled/View';
import {Colors} from '../../../themes';
import {BarImage} from '../../../components/common';
import NavigationService from '../../../navigation/NavigationService';

const UpcomingBookScreen = ({bookings}) => {
  const cancelBook = (book) => {
    alert('coming soon');
  };
  const onPressBook = (book) => {
    NavigationService.navigate('Booking', {
      services: book.barber.services,
      selected: book.book_services.map((i) => i.service.id),
      barber: book.barber,
      paymentMethod: book.paymentMethod,
      completed: book.completed,
      time: book.time,
      editing: true,
      bookId: book.id,
    });
  };
  const _renderBookingItem = ({item}) => {
    const book = item;
    const barber = book.barber;
    if (!moment(book.time).isAfter()) return null;
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
          onPress={() => onPressBook(book)}
          align="center"
          padding={10}
          key={book.id}
          style={{flex: 1}}>
          <BarImage image={{uri: barber.avatar}} width={60} height={60} round />
          <BarView ml={10} style={{flex: 1}}>
            <H5 pv={2}>{moment(book.time).format('MMM Do, HH:mm a')}</H5>
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
          onPress={() => cancelBook(book)}
          background={Colors.outline}>
          <BarIcon type="AntDesign" name="close" color={Colors.background} />
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

export default UpcomingBookScreen;
