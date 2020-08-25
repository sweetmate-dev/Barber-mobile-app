import React, {useState, useEffect, useContext} from 'react';
import {View, Dimensions} from 'react-native';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {useQuery} from '@apollo/react-hooks';
import {Colors} from '../../../themes';
import {BarHeader} from '../../../components/common';
import {H5} from '../../../components/styled/Text';
import {ABSView, BarView} from '../../../components/styled/View';
import {AppLogo, Background1} from '../../../assets/images';
import UpcomingBookScreen from './UpcomingBooks';
import PastBookScreen from './PastBooks';
import {GET_MY_BOOKINGS} from '../../../graphql/query';
import {Context as AuthContext} from '../../../context/authContext';
import {WaveIndicator} from 'react-native-indicators';

const BookScreen = ({route, navigation}) => {
  const {initialIndex} = route.params || {};
  const [index, setIndex] = useState(initialIndex || 0);
  const {state} = useContext(AuthContext);
  const {loading, error, data} = useQuery(GET_MY_BOOKINGS, {
    variables: {user_id: state.user.id},
  });
  const routes = [
    {key: 'upcoming', title: 'UPCOMING'},
    {key: 'past', title: 'PAST'},
  ];

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <ABSView background={Colors.background} style={{opacity: 0.9}} />
      <BarHeader title={<H5 weight="bold">APPOINTMENTS</H5>} hasBack={false} />
      {loading && (
        <BarView justify="center" align="center">
          <WaveIndicator color={Colors.text} />
        </BarView>
      )}
      {!loading && error && (
        <BarView justify="center" align="center">
          <H5>{JSON.stringify(error)}</H5>
        </BarView>
      )}
      {!loading && !error && (
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap({
            upcoming: () => <UpcomingBookScreen bookings={data.bookings} />,
            past: () => <PastBookScreen bookings={data.bookings} />,
          })}
          onIndexChange={(i) => setIndex(i)}
          initialLayout={{width: Dimensions.get('window').width}}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: Colors.outline}}
              style={{
                backgroundColor: 'transparent',
                borderBottomWidth: 0,
                elevation: 0,
              }}
              renderLabel={({route, focused, color}) => {
                const iconColor = focused ? Colors.outline : Colors.text;
                return <H5 color={iconColor}>{route.title}</H5>;
              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default BookScreen;
