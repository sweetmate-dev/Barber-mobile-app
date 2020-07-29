import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {H5, H6} from '../../components/styled/Text';
import {RootView, BarContent, BarView} from '../../components/styled/View';
import {Colors} from '../../themes';
import {dySize} from '../../utils/responsive';
import {BarButton} from '../../components/styled/Button';
import NavigationService from '../../navigation/NavigationService';
import {GET_BARBER_SERVICES} from '../../graphql/query';
import {showAlert} from '../../services/operators';
import {WaveIndicator} from 'react-native-indicators';

const BarberServiceScreen = ({barber}) => {
  const {loading, error, data} = useQuery(GET_BARBER_SERVICES, {
    variables: {barberId: barber.id.toString()},
  });
  console.log({loading, error, data});

  const onSelectService = (service) => {
    NavigationService.navigate('Booking', {
      services: data.services,
      selected: [service.id],
      barber,
    });
  };

  if (error) return null;
  return (
    <RootView align="flex-start">
      <H6 weight="bold" ml={10}>
        SERVICES
      </H6>
      <BarContent contentContainerStyle={{padding: dySize(10)}}>
        {loading && (
          <BarView justify="center" align="center">
            <WaveIndicator color={Colors.text} />
          </BarView>
        )}
        {!loading && data && data.services.length === 0 && (
          <H6 color={Colors.placeholder} mt={20} align="center">
            No available services.
          </H6>
        )}
        {!loading &&
          data &&
          data.services.map((service) => (
            <BarButton
              row
              key={service.id}
              onPress={() => onSelectService(service)}
              justify="space-between"
              align="flex-start"
              background={Colors.card}
              mb={2}
              br={2}>
              <BarView style={{flex: 1}} ph={10}>
                <H5 weight="bold">{service.name}</H5>
                <H6 color={Colors.placeholder} pv={1}>
                  {service.duration} minutes
                </H6>
                <H6>{service.description}</H6>
              </BarView>
              <H5 color={Colors.outline} mr={10}>
                ${service.price}
              </H5>
            </BarButton>
          ))}
      </BarContent>
    </RootView>
  );
};

export default BarberServiceScreen;
