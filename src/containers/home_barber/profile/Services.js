import React, {useState, useContext} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {H5, H6} from '../../../components/styled/Text';
import {RootView, BarContent, BarView} from '../../../components/styled/View';
import {dySize} from '../../../utils/responsive';
import {BarButton} from '../../../components/styled/Button';
import NavigationService from '../../../navigation/NavigationService';
import {GET_BARBER_SERVICES} from '../../../graphql/query';
import {Context as AuthContext} from '../../../context/authContext';
import {Colors} from '../../../themes';

const BarberServiceScreen = ({onShouldHideHeader, onShouldShowHeader}) => {
  const {state} = useContext(AuthContext);
  const [showHeader, setShowHeader] = useState(true);
  const servicesResponse = useQuery(GET_BARBER_SERVICES, {
    variables: {barberId: state.user.id},
  });

  if (servicesResponse.loading) return null;

  onPressAddService = () => {
    NavigationService.navigate('EditService', {
      service: {},
      barberId: state.user.id,
    });
  };

  onSelectService = (service) => {
    NavigationService.navigate('EditService', {
      service,
      barberId: state.user.id,
    });
  };

  let scrollStartOffset = 0;
  onScroll = (nativeEvent) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (offsetY > 200 && scrollStartOffset < offsetY && showHeader) {
      setShowHeader(false);
      onShouldHideHeader();
    } else if (offsetY < 200 && scrollStartOffset > offsetY && !showHeader) {
      setShowHeader(true);
      onShouldShowHeader();
    }
    scrollStartOffset = offsetY;
  };

  _renderServiceItem = ({item}) => {
    const service = item;
    return (
      <BarButton
        row
        key={service.id}
        onPress={() => onSelectService(service)}
        justify="space-between"
        align="flex-start"
        background={Colors.card}
        mb={2}
        br={2}>
        <BarView style={{flex: 1}} ph={5}>
          <H5 weight="bold">{service.name}</H5>
          <H6 color={Colors.placeholder} pv={1}>
            {service.duration} minutes
          </H6>
          <H6>{service.description}</H6>
        </BarView>
        <H5 color={Colors.outline} mr={10}>
          ￡{service.price}
        </H5>
      </BarButton>
    );
  };

  return (
    <RootView justify="flex-start" align="flex-start">
      {servicesResponse.data && (
        <BarContent
          contentContainerStyle={{padding: dySize(10)}}
          onScroll={(event) => onScroll(event.nativeEvent)}>
          <BarView row mt={10} justify="space-between">
            <H5 weight="bold">SERVICES</H5>
            <BarButton padding={1} mb={2} onPress={onPressAddService}>
              <H5 weight="bold" color={Colors.outline}>
                ADD
              </H5>
            </BarButton>
          </BarView>
          <FlatList
            data={servicesResponse.data.services}
            renderItem={_renderServiceItem}
          />
        </BarContent>
      )}
    </RootView>
  );
};

export default BarberServiceScreen;
