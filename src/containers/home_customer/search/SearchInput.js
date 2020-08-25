import React, {useState} from 'react';
import {RootView, BarView} from '../../../components/styled/View';
import {BarSearchInput, BarActionButton} from '../../../components/common';
import {Header} from 'native-base';
import {dySize} from '../../../utils/responsive';
import {Colors} from '../../../themes';
import NavigationService from '../../../navigation/NavigationService';
import {H5} from '../../../components/styled/Text';

const SearchInputScreen = ({route}) => {
  const [name, setName] = useState(route.params.name);
  const [location, setLocation] = useState(route.params.location);
  const [nameSearchInput, setNameSearchInput] = useState(null);
  const [locationSearchInput, setLocationSearchInput] = useState(null);
  const onFinishNameSearch = () => {
    locationSearchInput.focus();
  };
  onSubmit = () => {
    route.params.onChangeSearchText(name, location);
    NavigationService.goBack();
  };
  return (
    <RootView justify="flex-start" align="center">
      <Header
        style={{
          width: dySize(375),
          height: dySize(90),
          backgroundColor: Colors.background,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BarView width={355}>
          <BarSearchInput
            autoFocus
            onRef={(ref) => setNameSearchInput(ref)}
            onSubmitEditing={onFinishNameSearch}
            onChangeText={setName}
            value={name}
          />
        </BarView>
        <BarView width={355} mt={5}>
          <BarSearchInput
            onRef={(ref) => setLocationSearchInput(ref)}
            icon="enviromento"
            onChangeText={setLocation}
            value={location}
          />
        </BarView>
      </Header>
      <BarActionButton text="Search" mt={10} onPress={onSubmit} />
    </RootView>
  );
};

export default SearchInputScreen;
