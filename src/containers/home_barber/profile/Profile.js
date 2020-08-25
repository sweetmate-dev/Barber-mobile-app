import React, {useState, useContext, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-community/async-storage';
import {H5, H6} from '../../../components/styled/Text';
import {RootView, BarView} from '../../../components/styled/View';
import {dySize} from '../../../utils/responsive';
import {BarImage} from '../../../components/common';
import {Colors} from '../../../themes';
import {Context as AuthContext} from '../../../context/authContext';
import BarberInfoScreen from './Info';
import BarberReviewScreen from './Reviews';
import BarberServiceScreen from './Services';
import {GET_BARBER} from '../../../graphql/query';
import NavigationService from '../../../navigation/NavigationService';

const BarberProfileScreen = ({route}) => {
  const {initialIndex} = route.params || {};
  const [index, setIndex] = useState(initialIndex || 0);
  const {state} = useContext(AuthContext);
  const profileResponse = useQuery(GET_BARBER, {
    variables: {email: state.user.email},
  });
  if (profileResponse.loading)
    return <View style={{flex: 1, backgroundColor: Colors.background}} />;
  console.log(profileResponse.data);
  const barber = profileResponse.data.barbers[0];

  // useEffect(async () => {
  //   Auth.signOut();
  //   await AsyncStorage.clear();
  //   NavigationService.reset('AuthStack');
  // }, []);

  const routes = [
    {key: 'info', title: 'INFO'},
    {key: 'reviews', title: '★★★★★'},
    {key: 'services', title: 'SERVICES'},
  ];

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <BarView align="center">
        <BarImage
          image={{uri: barber.avatar}}
          width={375}
          height={200}
          type="avatar"
        />
        <LinearGradient
          colors={['#00000055', '#000000CC', '#000000FF']}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            height: dySize(200),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BarImage
            round
            image={{uri: barber.avatar}}
            width={80}
            height={80}
            type="avatar"
          />
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

export default BarberProfileScreen;
