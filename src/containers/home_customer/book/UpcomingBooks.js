import React, {useContext} from 'react';
import moment from 'moment';
import {FlatList} from 'react-native-gesture-handler';
import {useMutation} from '@apollo/client';
import {BarButton} from '../../../components/styled/Button';
import {H5, H6, BarIcon} from '../../../components/styled/Text';
import {RootView, BarView} from '../../../components/styled/View';
import {Colors} from '../../../themes';
import {BarImage} from '../../../components/common';
import NavigationService from '../../../navigation/NavigationService';
import {CANCEL_BOOKING} from '../../../graphql/mutation';
import {GET_MY_BOOKINGS} from '../../../graphql/query';
import {Context as AuthContext} from '../../../context/authContext';
import {showConfirmAlert} from '../../../services/operators';

const UpcomingBookScreen = ({bookings}) => {
  const {state} = useContext(AuthContext);
  const [cancelBook] = useMutation(CANCEL_BOOKING, {
    refetchQueries: [
      {
        query: GET_MY_BOOKINGS,
        variables: {user_id: state.user.id},
      },
    ],
  });
  const onPressCancelBook = (book) => {
    showConfirmAlert({description: 'You want to cancel this book?'}, () => {
      cancelBook({
        variables: {book_id: book.id},
      });
    });
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
          onPress={() => onPressCancelBook(book)}
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
