import React, {useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import LinearGradient from 'react-native-linear-gradient';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {GET_BARBER_SERVICES} from '../../graphql/query';
import {BarView} from '../../components/styled/View';
import {BarHeader, BarImage} from '../../components/common';
import {H5} from '../../components/styled/Text';
import {dySize} from '../../utils/responsive';
import BarberInfoScreen from '../barber/Info';
import BarberReviewScreen from '../barber/Reviews';
import BarberServiceScreen from '../barber/Services';
import {Colors} from '../../themes';

const BarberProfile = ({route}) => {
  const {initialIndex} = route.params;
  const barber = route.params.barber;
  const [index, setIndex] = useState(initialIndex || 0);
  const getBarberServices = useQuery(GET_BARBER_SERVICES, {
    variables: {barberId: barber.id},
  });
  const routes = [
    {key: 'info', title: 'INFO'},
    {key: 'reviews', title: '★★★★★'},
    {key: 'services', title: 'SERVICES'},
  ];

  useEffect(() => {
    getBarberServices.refetch();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <BarHeader
        title={<H5 weight="bold">Barber Profile</H5>}
        hasRight
        rightIconType="AntDesign"
        rightIcon="pushpin"
      />
      <BarView align="center">
        <BarImage image={{uri: barber.avatar}} width={355} height={160} />
        <LinearGradient
          colors={['#00000055', '#000000CC', '#000000FF']}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            height: dySize(160),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BarImage round image={{uri: barber.avatar}} width={80} height={80} />
          <H5 weight="bold">{barber.name}</H5>
        </LinearGradient>
      </BarView>
      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({
          info: () => <BarberInfoScreen barber={barber} />,
          reviews: BarberReviewScreen,
          services: () => <BarberServiceScreen barber={barber} />,
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
              const iconColor = focused ? Colors.outline : Colors.placeholder;
              return <H5 color={iconColor}>{route.title}</H5>;
            }}
          />
        )}
      />
    </View>
  );
};

export default BarberProfile;
