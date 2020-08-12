import {gql} from '@apollo/client';

export const GET_USER = gql`
  query GetUser($email: String!) {
    users(where: {email: {_eq: $email}}) {
      email
      name
      id
      phone
      avatar
    }
  }
`;

export const GET_BARBERS = gql`
  query {
    barbers {
      id
      name
      title
      location
      avatar
      phone
      email
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
    services(where: {barber_id: {_eq: $barberId}}) {
      id
      name
      price
      duration
      description
    }
  }
`;

export const GET_MY_BOOKINGS = gql`
  query getMyBookings($user_id: String!) {
    bookings(where: {user_id: {_eq: $user_id}}) {
      id
      user_id
      time
      paymentMethod
      barber_id
      completed
      barber {
        id
        name
        email
        avatar
        title
        location
        phone
        services {
          id
          name
          price
          duration
          description
        }
      }
      book_services {
        service {
          id
          name
          duration
          price
          description
        }
      }
    }
  }
`;

export const GET_MY_CUTS = gql`
  query GetMyCuts($user_id: String!) {
    user_cuts(where: {user_id: {_eq: $user_id}}) {
      id
      user_id
      image
    }
  }
`;

export const GET_FAVORITE_BARBERS = gql`
  query GetFavoriteBarbers($user_id: String!) {
    favorite_barbers(where: {user_id: {_eq: $user_id}}) {
      id
      barber {
        id
        name
        title
        location
        avatar
        phone
        email
        requirePhoneNumber
        requireStreetAddress
        requireCity
        requireState
        requireZipCode
        requireHowFind
      }
    }
  }
`;
