import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import {Agenda, CalendarList} from 'react-native-calendars';
import {useQuery, useMutation} from '@apollo/client';
import {H5, H6, BarIcon} from '../../../components/styled/Text';
import {RootView, BarContent, BarView} from '../../../components/styled/View';
import {dySize} from '../../../utils/responsive';
import {Colors} from '../../../themes';
import {BarHeader, BarImage} from '../../../components/common';
import {GET_BARBER_BOOKINGS} from '../../../graphql/query';
import {Context as AuthContext} from '../../../context/authContext';
import {WaveIndicator} from 'react-native-indicators';

const pastMonthRange = 2;
const futureMonthRange = 2;

const BarberBookScreen = () => {
  const Today = new Date();
  const TodayDateString = moment(Today).format('YYYY-MM-DD');
  const [date, setDate] = useState(TodayDateString);
  const [books, setBooks] = useState({});
  const {state} = useContext(AuthContext);
  const MyBookings = useQuery(GET_BARBER_BOOKINGS, {
    variables: {barber_id: state.user.id},
  });

  useEffect(() => {
    // generate Angeda Items
  });

  generateBookingItems = () => {
    const bookings = MyBookings.data.bookings;
    console.log(bookings);
    if (bookings.length === 0) return {};
    const minDate = moment(TodayDateString)
      .subtract(pastMonthRange, 'months')
      .format('YYYY-MM-DD');
    const maxDate = moment(TodayDateString)
      .add(futureMonthRange, 'months')
      .format('YYYY-MM-DD');
    let result = {};
    let temp = minDate;
    while (temp < maxDate) {
      result[temp] = bookings.filter(
        (book) => moment(book.time).format('YYYY-MM-DD') === temp,
      );
      temp = moment(temp).add(1, 'days').format('YYYY-MM-DD');
    }
    return result;
  };

  renderBookingItem = (item, firstItemInDay) => {
    const statusText = ['Cancelled', 'Pending', 'Completed'];
    const statusColors = [Colors.red, Colors.outline, Colors.success];
    return (
      <BarView
        background={Colors.card}
        ph={10}
        pv={10}
        mr={20}
        br={4}
        mt={firstItemInDay ? 35 : 10}>
        <BarView row justify="space-between" mb={10}>
          <BarImage
            type="avatar"
            image={{uri: item.user.avatar}}
            width={40}
            height={40}
            round
          />
          <BarView ml={10} style={{flex: 1}}>
            <H5>{item.user.name}</H5>
            {item.book_services.map((service) => (
              <BarView row align="center">
                <H6 color={Colors.placeholder}>- {service.service.name}</H6>
              </BarView>
            ))}
          </BarView>
          <BarView align="flex-end">
            <H5>{moment(item.time).format('HH:mm A')}</H5>
            <H6
              style={{fontStyle: 'italic'}}
              color={statusColors[item.status + 1]}>
              {statusText[item.status + 1]}
            </H6>
          </BarView>
        </BarView>
      </BarView>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <BarHeader
        title={<H5 weight="bold">APPOINTMENTS</H5>}
        leftIcon="plus"
        hasRight
        rightIcon="ios-calendar"
      />
      {MyBookings.loading ? (
        <WaveIndicator color={Colors.text} />
      ) : (
        <View style={{flex: 1, paddingBottom: 20}}>
          <H5 color={Colors.outline} align="center">
            {moment(date).format('MMMM YYYY')}
          </H5>
          <Agenda
            items={generateBookingItems()}
            firstDay={0}
            // Callback that gets called when items for a certain month should be loaded (month became visible)
            loadItemsForMonth={(month) => {
              // month: {"dateString": "2020-09-07", "day": 7, "month": 9, "timestamp": 1599436800000, "year": 2020}
            }}
            // Callback that fires when the calendar is opened or closed
            onCalendarToggled={(calendarOpened) => {
              console.log(calendarOpened);
            }}
            // Callback that gets called on day press
            onDayPress={(day) => {
              setDate(day.dateString);
            }}
            // Callback that gets called when day changes while scrolling agenda list
            onDayChange={(day) => {
              setDate(day.dateString);
            }}
            // Initially selected day
            selected={date}
            minDate={'2020-08-01'}
            maxDate={'2020-10-31'}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={2}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={2}
            // Specify how each item should be rendered in agenda
            renderItem={renderBookingItem}
            // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
            // renderDay={(day, item) => {
            //   console.log({day});
            //   return <H5>{JSON.stringify(item)}</H5>;
            // }}
            // Specify how empty date content with no items should be rendered
            renderEmptyDate={() => {
              return (
                <BarView height={50} mt={35}>
                  <H6 color={Colors.placeholder} style={{fontStyle: 'italic'}}>
                    No appointments scheduled
                  </H6>
                </BarView>
              );
            }}
            // Specify how agenda knob should look like
            // Specify what should be rendered instead of ActivityIndicator
            // renderEmptyData={() => {
            //   return <H5>No appointments scheduled</H5>;
            // }}
            // Specify your item comparison function for increased performance
            rowHasChanged={(r1, r2) => {
              return r1.name !== r2.name;
            }}
            // Hide knob button. Default = false
            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
            // markedDates={{
            //   '2012-05-16': {selected: true, marked: true},
            //   '2012-05-17': {marked: true},
            //   '2012-05-18': {disabled: true},
            // }}
            // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
            disabledByDefault={true}
            // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
            onRefresh={() => console.log('refreshing...')}
            // Set this true while waiting for new data from a refresh
            refreshing={false}
            // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
            refreshControl={null}
            // Agenda theme
            theme={{
              backgroundColor: Colors.background,
              calendarBackground: Colors.background,
              textSectionTitleColor: Colors.gray,
              dotColor: Colors.outline,

              agendaDayTextColor: 'yellow',
              agendaDayNumColor: 'green',
              agendaTodayColor: 'red',
              agendaKnobColor: Colors.outline,
              'stylesheet.day.basic': {
                selected: {
                  backgroundColor: Colors.outline,
                  borderRadius: 18,
                  height: 36,
                  width: 36,
                },
                selectedDot: {
                  backgroundColor: 'black',
                },
                selectedText: {
                  color: Colors.background,
                },
                dot: {
                  width: 4,
                  height: 4,
                  marginTop: 1,
                  borderRadius: 2,
                  opacity: 0,
                  backgroundColor: Colors.outline,
                },
                todayText: {
                  color: Colors.outline,
                },
              },
            }}
            // Agenda container style
            style={{backgroundColor: Colors.background, height: 50}}
          />
        </View>
      )}
    </View>
  );
};

export default BarberBookScreen;
