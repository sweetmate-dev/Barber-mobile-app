import {gql} from '@apollo/client';

export const GET_BARBERS = gql`
  query {
    barber {
      id
      name
      title
      location
      avatar
      phone
      requirePhoneNumber
      requireStreetAddress
      requireCity
      requireState
      requireZipCode
      requireHowFind
    }
  }
`;

export const GET_BARBER_SERVICES = gql`
  query services($barberId: String) {
    services(where: {barber: {_eq: $barberId}}) {
      id
      name
      price
      duration
      description
    }
  }
`;
