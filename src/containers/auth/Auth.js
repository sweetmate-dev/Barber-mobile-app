import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import {Colors} from '../../themes';
import {BarImage, BarHeader} from '../../components/common';
import {H5} from '../../components/styled/Text';
import {AppLogo} from '../../assets/images';

const AuthScreen = ({route, navigation}) => {
  const {initialIndex} = route.params;
  const [index, setIndex] = useState(initialIndex || 0);
  const routes = [
    {key: 'login', title: 'LOG IN'},
    {key: 'signup', title: 'SIGN UP'},
  ];

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <BarHeader
        title={<BarImage image={AppLogo} width={240} height={70} />}
        leftIcon="ios-arrow-back"
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({
          login: LoginScreen,
          signup: RegisterScreen,
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
              return <H5 color={Colors.text}>{route.title}</H5>;
            }}
          />
        )}
      />
    </View>
  );
};

export default AuthScreen;
