import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import * as _ from 'lodash';
import {CalendarList} from 'react-native-calendars';
import {RootView} from '../../components/styled/View';
import {BarHeader} from '../../components/common';
import {H5} from '../../components/styled/Text';
import {dySize} from '../../utils/responsive';
import {Colors} from '../../themes';
import {FlatList} from 'react-native-gesture-handler';
import {getTimeFormat} from '../../services/operators';
import {BarButton} from '../../components/styled/Button';
import NavigationService from '../../navigation/NavigationService';

const WORK_DAYS_TIMES = {
  3: [7, 8, 9, 10, 11, 14, 15, 16, 17, 18],
  5: [4, 5, 6, 8, 9, 10, 11, 12, 15, 16, 17, 18],
  6: [9, 10, 11, 14, 15, 16, 17, 18, 19, 20],
  0: [7, 8, 9, 10, 11, 12, 14, 15, 16, 17],
};

const slotInterval = 0.25;

const BookingDate = ({route}) => {
  const Today = new Date();
  const TodayDateString = moment(Today).format('YYYY-MM-DD');

  const getDaysInMonth = (start_month, start_year) => {
    let pivot = moment().month(start_month).year(start_year).startOf('month');
    const end = moment()
      .month(start_month)
      .year(start_year)
      .startOf('month')
      .add(7, 'months');
    let dates = {};
    const disabled = {disabled: true};
    while (pivot.isBefore(end)) {
      if (
        Object.keys(WORK_DAYS_TIMES).indexOf(
          new Date(pivot).getDay().toString(),
        ) < 0
      ) {
        dates[moment(pivot).format('YYYY-MM-DD')] = disabled;
      }
      pivot.add(1, 'days');
    }
    console.log(Object.keys(WORK_DAYS_TIMES));
    return dates;
  };

  const [date, setDate] = useState(route.params.bookDate || TodayDateString);
  const [disabledDates, setDisabledDates] = useState(
    getDaysInMonth(Today.getMonth(), Today.getFullYear()),
  );
  const [availableSlots, setAvailalbeSlots] = useState(TodayDateString);
  const [selectedSlot, setSelectedSlot] = useState(route.params.bookTime);

  useEffect(() => {
    onSelectDate(date);
  }, []);

  onSelectDate = (dateString) => {
    // if today is unavailable day, show the nearest available day

    const WN = new Date(dateString).getDay();
    const slots = WORK_DAYS_TIMES[WN];
    if (!slots) {
      setDate(null);
      return;
    }
    const h = Math.floor(selectedSlot);
    if (slots.indexOf(h) < 0 || slots.indexOf(h + 1) < 0) {
      setSelectedSlot(0);
    }
    setAvailalbeSlots(slots);
  };

  onSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  onPressBack = () => {
    NavigationService.goBack();
  };

  onPressRight = () => {
    route.params.onSelectBookingDate(date, selectedSlot);
    NavigationService.goBack();
  };

  const renderSlot = ({item}) => {
    const slot = item;
    if (availableSlots.indexOf(slot + 1) < 0) return;

    return (
      <>
        {_.range(1 / slotInterval).map((s, index) => {
          const slotValue = slot + index * slotInterval;

          // hide past time for today bookings
          if (
            new Date().getTime() >
            new Date(moment(date).local()).getTime() + slotValue * 3600 * 1000
          )
            return null;
          return (
            <BarButton
              onPress={() => onSelectSlot(slotValue)}
              background={
                selectedSlot === slotValue ? Colors.outline : Colors.card
              }
              row
              br={4}
              mb={4}
              ph={10}
              pv={15}
              width={355}>
              <H5
                weight="bold"
                color={
                  selectedSlot === slotValue ? Colors.background : Colors.text
                }>
                {getTimeFormat(slotValue)}
              </H5>
            </BarButton>
          );
        })}
      </>
    );
  };
  return (
    <RootView justify="flex-start">
      <BarHeader
        title={<H5 weight="bold">DATE & TIME</H5>}
        onPressBack={onPressBack}
        hasRight={selectedSlot > 0}
        rightIcon="check"
        rightIconType="AntDesign"
        onPressRight={onPressRight}
      />
      <View style={{height: dySize(320)}}>
        <CalendarList
          markingType={'custom'}
          onDayPress={(day) => {
            if (disabledDates[day.dateString]) return;
            setDate(day.dateString);
            onSelectDate(day.dateString);
          }}
          pastScrollRange={0}
          futureScrollRange={6}
          current={date}
          minDate={TodayDateString}
          horizontal={true}
          pagingEnabled={true}
          calendarWidth={dySize(375)}
          theme={{
            monthTextColor: Colors.outline,
            todayTextColor: Colors.outline,
            calendarBackground: Colors.background,
            textSectionTitleColor: Colors.placeholder,
            textSectionTitleDisabledColor: Colors.outline,
            dayTextColor: Colors.text,
            textDisabledColor: Colors.gray,
          }}
          markedDates={{
            [date]: {
              marked: true,
              customStyles: {
                container: {
                  backgroundColor: Colors.outline,
                  borderRadius: 20,
                  elevation: 2,
                },
                text: {
                  color: Colors.background,
                  fontWeight: 'bold',
                },
              },
            },
            ...disabledDates,
          }}
        />
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: 40}}
        data={availableSlots}
        renderItem={renderSlot}
        keyExtractor={(item, index) => index}
      />
    </RootView>
  );
};

export default BookingDate;
