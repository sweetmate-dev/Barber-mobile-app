import React from 'react';
import {H5, H6} from '../../components/styled/Text';
import {RootView, BarContent, BarView} from '../../components/styled/View';
import {Colors} from '../../themes';
import {dySize} from '../../utils/responsive';
import {BarButton} from '../../components/styled/Button';
import NavigationService from '../../navigation/NavigationService';

const SERVICES = [
  {
    id: 1,
    name: 'Haircut',
    duration: 30,
    description: 'Ceasar/Taper/Fade + Bearrd included',
    price: 35,
  },
  {
    id: 2,
    name: 'Scissor Cut',
    duration: 30,
    description: 'Haircut + Beard included',
    price: 40,
  },
  {
    id: 3,
    name: 'Shape Up',
    duration: 15,
    description: 'Line up + Beard included',
    price: 20,
  },
  {
    id: 4,
    name: 'Custom Design',
    duration: 45,
    description:
      'Custom designs START at $40 (price varies depending on design)',
    price: 45,
  },
  {
    id: 5,
    name: 'Kids Haircuts',
    duration: 30,
    description: 'Children under 13 yrs old',
    price: 20,
  },
  {
    id: 6,
    name: 'The Batman Special',
    duration: 30,
    description:
      'Charcoal Black Mask Facial: includes facial cleanse, blackhead removal,  steam towel finish with message',
    price: 25,
  },
  {
    id: 7,
    name: 'The Ballers Deluxe',
    duration: 60,
    description:
      'Haircut + Beard shave/trim + Charcoal Black Mask Facial + Facial message',
    price: 50,
  },
  {
    id: 8,
    name: 'Eyebrows',
    duration: 15,
    description: 'Eyebrow trim and shape with hot steamed towel razor finish',
    price: 10,
  },
];
const BarberServiceScreen = () => {
  const onSelectService = (service) => {
    NavigationService.navigate('Booking', {
      services: SERVICES,
      selected: [service.id],
    });
  };
  return (
    <RootView align="flex-start">
      <H6 weight="bold" ml={10}>
        SERVICES
      </H6>
      <BarContent contentContainerStyle={{padding: dySize(10)}}>
        {SERVICES.map((service) => (
          <BarButton
            row
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
