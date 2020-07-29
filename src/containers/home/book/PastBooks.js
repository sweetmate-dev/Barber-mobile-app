import React from 'react';
import {H5, H6, BarIcon} from '../../../components/styled/Text';
import {RootView, BarView} from '../../../components/styled/View';
import {FlatList} from 'react-native-gesture-handler';
import {Colors} from '../../../themes';
import {BarImage} from '../../../components/common';
import {BarButton} from '../../../components/styled/Button';
import NavigationService from '../../../navigation/NavigationService';

const PastBooks = [
  {
    id: 1,
    user: {
      id: 3,
      avatar: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      name: 'Matthew Sadler',
      title: 'Senior Barber',
      location: 'Aurora, CO, United States',
      phone: '',
    },
    time: '2020-07-26 14:15 PM',
  },
  {
    id: 2,
    user: {
      id: 2,
      avatar: 'https://homepages.cae.wisc.edu/~ece533/images/baboon.png',
      name: 'John Amuesi',
      title: 'Advanced Barber',
      location: 'London, United Kindom',
      phone: '',
    },
    time: '2020-07-29 08:15 PM',
  },
];

const PastBookScreen = () => {
  const onBookAgain = (user) => {
    NavigationService.navigate('BarberProfile', {
      barber: user,
      initialIndex: 2,
    });
  };
  const _renderBookingItem = ({item}) => {
    const book = item;
    return (
      <BarView
        row
        align="center"
        br={4}
        background={Colors.card}
        mt={4}
        ph={10}
        pv={10}
        width={365}>
        <BarImage
          image={{uri: book.user.avatar}}
          width={60}
          height={60}
          round
        />
        <BarView ml={10} style={{flex: 1}}>
          <H5 pv={2}>{book.time}</H5>
          <H6 pv={2} color={Colors.placeholder}>
            {book.user.name}
          </H6>
          <H6 pv={2} color={Colors.placeholder}>
            {book.user.location}
          </H6>
        </BarView>
        <BarButton
          width={40}
          height={40}
          br={20}
          background={Colors.outline}
          onPress={() => onBookAgain(book.user)}>
          <BarIcon type="AntDesign" name="calendar" color={Colors.background} />
        </BarButton>
      </BarView>
    );
  };
  return (
    <RootView>
      <FlatList
        contentContainerStyle={{paddingBottom: 40}}
        data={PastBooks}
        renderItem={_renderBookingItem}
        keyExtractor={(item) => item.id}
      />
    </RootView>
  );
};

export default PastBookScreen;
