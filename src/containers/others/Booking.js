import React, {useState, useEffect, useContext} from 'react';
import * as _ from 'lodash';
import moment from 'moment';
import {useMutation} from '@apollo/client';
import {RootView, BarContent, BarView} from '../../components/styled/View';
import {BarHeader, BarActionButton} from '../../components/common';
import {dySize} from '../../utils/responsive';
import BarberItem from '../barber/components/BarberItem';
import {Colors} from '../../themes';
import {H6, H5, BarIcon} from '../../components/styled/Text';
import {showAlert, showLoading, hideLoading} from '../../services/operators';
import {BarButton} from '../../components/styled/Button';
import BookAdditionalInformation from '../barber/components/BookAdditionalInformation';
import NavigationService from '../../navigation/NavigationService';
import {
  ADD_BOOK,
  UPDATE_BOOK,
  ADD_SERVICES,
  UPDATE_SERVICES,
} from '../../graphql/mutation';
import {Context as AuthContext} from '../../context/authContext';
import {GET_MY_BOOKINGS} from '../../graphql/query';

const PaymentMethods = [
  {
    key: 'mobile',
    description: 'Mobile Pay',
  },
  {
    key: 'shop',
    description: 'In Shop',
  },
];

const Booking = ({route}) => {
  const editing = route.params.editing || false;
  const services = route.params.services || [];
  const barber = route.params.barber;
  const bookId = route.params.bookId;
  const [sum, setSum] = useState(0);
  const [selected, setSelected] = useState(route.params.selected || []); // selected service ids
  const [bookDateTime, setBookDateTime] = useState(route.params.time || null);
  const [payMethod, setPayMethod] = useState(
    route.params.paymentMethod || 'shop',
  );
  const {state} = useContext(AuthContext);
  const [additionalInputs, setAdditionalInputs] = useState({});
  const completed = route.params.completed || false;

  useEffect(() => {
    let sum = 0;
    services.map((service) => {
      if (selected.indexOf(service.id) < 0) return;
      sum += service.price;
    });
    setSum(sum);
  }, [selected]);

  const onToggleService = (service) => {
    const index = selected.indexOf(service.id);
    const temp = _.cloneDeep(selected);
    if (index < 0) {
      temp.push(service.id);
    } else {
      temp.splice(index, 1);
    }
    setSelected(temp);
  };

  gotoBookingCalendar = () => {
    const TS = new Date(bookDateTime);
    const params = {
      bookDate: bookDateTime ? moment(bookDateTime).format('YYYY-MM-DD') : null,
      bookTime: TS.getHours() + TS.getMinutes() / 60,
      onSelectBookingDate,
    };
    NavigationService.navigate('BookingDate', params);
  };

  onSelectBookingDate = (date, time) => {
    if (date) {
      let TS = moment(date).local();
      TS += time * 3600 * 1000;
      setBookDateTime(TS);
    }
  };

  onAddedBook = (data) => {
    let param = [];
    const bookId = data.insert_bookings.returning[0].id;
    selected.map((selectedService) => {
      param.push({
        book_id: bookId,
        service_id: selectedService,
      });
    });
    addServices({
      variables: {
        objects: param,
      },
    });
  };

  onAddedServices = (data) => {
    hideLoading();
    NavigationService.goBack();
  };

  onUpdatedBook = (data) => {
    let param = [];
    const bookId = data.update_bookings.returning[0].id;
    console.log({selected});
    selected.map((selectedService) => {
      param.push({
        book_id: bookId,
        service_id: selectedService,
      });
    });
    updateServices({
      variables: {
        book_id: bookId,
        objects: param,
      },
    });
  };

  onUpdatedServices = (data) => {
    hideLoading();
    NavigationService.goBack();
  };

  const [addBook] = useMutation(ADD_BOOK, {
    onCompleted: onAddedBook,
  });
  const [updateBook] = useMutation(UPDATE_BOOK, {
    onCompleted: onUpdatedBook,
  });
  const [addServices] = useMutation(ADD_SERVICES, {
    onCompleted: onAddedServices,
  });
  const [updateServices] = useMutation(UPDATE_SERVICES, {
    onCompleted: onUpdatedServices,
    refetchQueries: [
      {
        query: GET_MY_BOOKINGS,
        variables: {user_id: state.user.id},
      },
    ],
  });

  onPressBook = () => {
    if (selected.length === 0)
      showAlert('You must select one service at least');
    else if (!bookDateTime) showAlert('You must select booking data');
    else if (errorInfo.length > 0) showAlert(errorInfo[0]);
    else if (!editing) {
      showLoading('Adding book...');
      addBook({
        variables: {
          user_id: state.user.id,
          time: new Date(bookDateTime).toISOString(),
          payment: payMethod,
          barber_id: barber.id,
          completed: false,
        },
      });
    } else {
      showLoading('Updating book...');
      updateBook({
        variables: {
          book_id: bookId,
          user_id: state.user.id,
          time: new Date(bookDateTime).toISOString(),
          payment: payMethod,
          barber_id: barber.id,
          completed: false,
        },
      });
    }
  };

  return (
    <RootView>
      <BarHeader title={<H5 weight="bold">BOOK APPOINTMENT</H5>} />
      <BarContent
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          padding: dySize(10),
          paddingBottom: dySize(60),
        }}>
        <BarberItem user={barber} hasCallButton />
        <BarView background={Colors.card} ph={10}>
          <H6>
            As a result of the COVID-19 pandemic, many states and local
            jurisdictions have issued stay at home orders and restrictive
            measures that may prevent individuals in those locations from using
            BarbApp. It is your responsibility to adhere to the regulations put
            inplace by your local government. Even in those locatoins where it
            is permissible to schedule appointments using BarbApp, please
            understand these is still a substantial risk of becoming exposed to
            or inflected by the COVIC-19 virus. By booking this appointment, you
            agree to the{' '}
            <H6
              color={Colors.outline}
              underline
              onPress={() => showAlert('Coming soon')}>
              COVID-19 Terms Of Service
            </H6>
          </H6>
        </BarView>

        <H5 weight="bold" mt={10}>
          SELECT SERVICES
        </H5>
        {services.map((service) => {
          const isSelected = selected.indexOf(service.id) > -1;
          return (
            <BarButton
              row
              align="center"
              background={Colors.card}
              br={1}
              mb={2}
              padding={10}
              onPress={() => onToggleService(service)}>
              <BarView
                background={isSelected ? Colors.outline : Colors.card}
                width={24}
                height={24}
                br={12}
                mr={10}
                justify="center"
                align="center">
                {isSelected && (
                  <BarIcon
                    type="AntDesign"
                    name="check"
                    margin={1}
                    color={Colors.background}
                    size={15}
                  />
                )}
              </BarView>
              <BarView style={{flex: 1}}>
                <H5>{service.name}</H5>
                <H6 color={Colors.placeholder}>{service.duration} minutes</H6>
              </BarView>
              <H5 color={Colors.outline}>￡{service.price}</H5>
            </BarButton>
          );
        })}

        <H5 weight="bold" mt={10}>
          SELECT DATE & TIME
        </H5>
        <BarButton
          row
          onPress={gotoBookingCalendar}
          background={Colors.card}
          justify="space-between">
          {bookDateTime && (
            <H5>{moment(bookDateTime).format('YYYY-MM-DD     HH:mm A')}</H5>
          )}
          {!bookDateTime && <H5 color={Colors.placeholder}>Select</H5>}
          <BarIcon type="AntDesign" name="right" color={Colors.placeholder} />
        </BarButton>

        <H5 weight="bold" mt={10}>
          PAYMENT
        </H5>
        <BarView row wrap align="center">
          {PaymentMethods.map((method) => (
            <BarButton
              row
              justify="flex-start"
              key={method.key}
              width={170}
              onPress={() => setPayMethod(method.key)}>
              <BarIcon
                type="AntDesign"
                name="check"
                margin={1}
                color={
                  payMethod === method.key ? Colors.background : 'transparent'
                }
                size={15}
                style={{
                  width: 24,
                  height: 24,
                  lineHeight: 24,
                  borderRadius: 12,
                  overflow: 'hidden',
                  textAlign: 'center',
                  backgroundColor:
                    payMethod === method.key ? Colors.outline : Colors.card,
                }}
              />
              <H5 ml={10}>{method.description}</H5>
            </BarButton>
          ))}
        </BarView>
        <BookAdditionalInformation
          onChangeValues={(inputs, errorInfo) => {
            setAdditionalInputs(inputs);
            this.errorInfo = errorInfo;
          }}
          barber={barber}
        />
      </BarContent>
      <BarView
        row
        absolute
        justify="space-between"
        align="center"
        background={Colors.background}
        ph={10}
        pv={10}
        style={{
          bottom: 0,
          left: 0,
          right: 0,
        }}
        height={80}>
        <H5 color={Colors.outline}>${sum}</H5>
        <BarActionButton
          width={120}
          mt={0}
          text={editing ? 'Update Book' : 'Book'}
          onPress={onPressBook}
        />
      </BarView>
    </RootView>
  );
};

export default Booking;
