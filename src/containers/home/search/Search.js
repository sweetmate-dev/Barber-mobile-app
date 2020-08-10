import React, {useState, useEffect, useContext} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {WaveIndicator} from 'react-native-indicators';

import {RootView, BarView, BarContent} from '../../../components/styled/View';
import {BarSearchInput} from '../../../components/common';
import {Header} from 'native-base';
import {dySize} from '../../../utils/responsive';
import {Colors} from '../../../themes';
import NavigationService from '../../../navigation/NavigationService';
import {FlatList} from 'react-native-gesture-handler';
import BarberItem from '../../barber/components/BarberItem';
import {GET_BARBERS} from '../../../graphql/query';
import {BarIcon, H6} from '../../../components/styled/Text';
import {showAlert} from '../../../services/operators';
import {Context as AuthContext} from '../../../context/authContext';

const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState(null);
  const [name, setName] = useState('Barber');
  const [location, setLocation] = useState('Current Location');
  const searchBarbers = useQuery(GET_BARBERS);

  const onFocusSearch = ({nativeEvent}) => {
    if (searchInput) {
      NavigationService.navigate('SearchInput', {
        onChangeSearchText,
        name: name === 'Barber' || name,
        location: location === 'Current Location' || location,
      });
      searchInput.blur();
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
    return (
      <BarberItem key={item.id} user={item} onPress={() => onPressUser(item)} />
    );
  };

  return (
    <RootView justify="flex-start" align="flex-start">
      <Header
        style={{
          width: dySize(375),
          height: 45,
          backgroundColor: Colors.background,
          justifyContent: 'center',
          borderBottomWidth: 0,
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
        {searchBarbers.loading ? (
          <BarView justify="center" align="center">
            <WaveIndicator color={Colors.text} />
          </BarView>
        ) : searchBarbers.error ? (
          <H6 color={Colors.placeholder} align="center" mt={30}>
            {searchBarbers.error}
          </H6>
        ) : (
          <FlatList
            data={searchBarbers.data.barbers}
            ListEmptyComponent={
              <H6 color={Colors.placeholder} align="center">
                Can't find any barber
              </H6>
            }
            renderItem={_renderBarberItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </BarContent>
    </RootView>
  );
};

export default SearchScreen;
