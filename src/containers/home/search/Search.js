import React, {useState} from 'react';
import {RootView, BarView, BarContent} from '../../../components/styled/View';
import {BarSearchInput, BarImage} from '../../../components/common';
import {Header} from 'native-base';
import {dySize} from '../../../utils/responsive';
import {Colors} from '../../../themes';
import NavigationService from '../../../navigation/NavigationService';
import {FlatList} from 'react-native-gesture-handler';
import {H5, H6} from '../../../components/styled/Text';
import {BarButton} from '../../../components/styled/Button';
import BarberItem from '../../barber/components/BarberItem';

FilteredBarbers = [
  {
    id: 1,
    avatar: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
    name: 'Matthew Sadler',
    title: 'Senior Barber',
    location: 'Aurora, CO, United States',
  },
  {
    id: 2,
    avatar: 'https://homepages.cae.wisc.edu/~ece533/images/baboon.png',
    name: 'John Amuesi',
    title: 'Advanced Barber',
    location: 'London, United Kindom',
  },
  {
    id: 3,
    avatar: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
    name: 'Tian Li',
    title: 'Junior Barber',
    location: 'Shenyang, China',
  },
];

const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState(null);
  const [name, setName] = useState('Barber');
  const [location, setLocation] = useState('Current Location');

  const onFocusSearch = ({nativeEvent}) => {
    if (searchInput) {
      searchInput.blur();
      NavigationService.navigate('SearchInput', {
        onChangeSearchText,
        name: name === 'Barber' || name,
        location: location === 'Current Location' || location,
      });
    }
  };

  // Called when come back from searchInput screen
  onChangeSearchText = (name, location) => {
    setName(name.length > 0 ? name : 'Barber');
    setLocation(location.length > 0 ? location : 'Current Location');
  };

  onPressUser = (user) => {
    NavigationService.navigate('BarberProfile', {barber: user});
  };

  _renderBarberItem = ({item}) => {
    return <BarberItem user={item} onPress={() => onPressUser(item)} />;
  };

  return (
    <RootView justify="flex-start" align="flex-start">
      <Header
        style={{
          width: dySize(375),
          height: 45,
          backgroundColor: Colors.background,
          justifyContent: 'center',
        }}>
        <BarView width={355}>
          <BarSearchInput
            onRef={(ref) => setSearchInput(ref)}
            onFocus={onFocusSearch}
            hasCloseButton={false}
            value={`${name} - ${location}`}
            textColor={Colors.placeholder}
          />
        </BarView>
      </Header>
      <BarContent contentContainerStyle={{padding: dySize(10)}}>
        <FlatList
          data={FilteredBarbers}
          renderItem={_renderBarberItem}
          keyExtractor={(item) => item.id}
        />
      </BarContent>
    </RootView>
  );
};

export default SearchScreen;
