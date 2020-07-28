import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {Colors} from '../../../themes';
import {BarImage, BarHeader} from '../../../components/common';
import {H5} from '../../../components/styled/Text';
import {ABSView} from '../../../components/styled/View';
import {AppLogo, Background1} from '../../../assets/images';
import UpcomingBookScreen from './UpcomingBooks';
import PastBookScreen from './PastBooks';

const BookScreen = ({route, navigation}) => {
  const {initialIndex} = route.params || {};
  const [index, setIndex] = useState(initialIndex || 0);
  const routes = [
    {key: 'upcoming', title: 'UPCOMING'},
    {key: 'past', title: 'PAST'},
  ];

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      {/* <ABSView>
        <BarImage image={Background1} style={{height: '100%', width: '100%'}} />
      </ABSView> */}
      <ABSView background={Colors.background} style={{opacity: 0.9}} />
      <BarHeader title={<H5 weight="bold">APPOINTMENTS</H5>} />
      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({
          upcoming: UpcomingBookScreen,
          past: PastBookScreen,
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
    </View>
  );
};

export default BookScreen;
