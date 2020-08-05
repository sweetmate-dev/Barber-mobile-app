import {gql} from '@apollo/client';

export const UPDATE_USER_ID = gql`
  mutation UpdateUserId($email: String!, $id: String!) {
    update_users(where: {email: {_eq: $email}}, _set: {id: $id}) {
      returning {
        avatar
        email
        name
        phone
        id
      }
    }
  }
`;

export const UPDATE_BARBER_ID = gql`
  mutation UpdateBarberId($email: String!, $id: String!) {
    update_barbers(where: {email: {_eq: $email}}, _set: {id: $id}) {
      returning {
        id
        email
        location
        name
        avatar
        phone
        requireCity
        requireHowFind
        requirePhoneNumber
        requireState
        requireStreetAddress
        requireZipCode
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook(
    $user_id: String!
    $time: String!
    $payment: String!
    $barber_id: String!
    $completed: Boolean!
  ) {
    insert_bookings(
      objects: {
        user_id: $user_id
        time: $time
        paymentMethod: $payment
        barber_id: $barber_id
        completed: $completed
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $book_id: Int
    $user_id: String!
    $time: String!
    $payment: String!
    $barber_id: String!
    $completed: Boolean!
  ) {
    update_bookings(
      where: {id: {_eq: $book_id}}
      _set: {
        user_id: $user_id
        time: $time
        paymentMethod: $payment
        barber_id: $barber_id
        completed: $completed
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const ADD_SERVICES = gql`
  mutation AddBookServices($objects: [book_service_insert_input!]!) {
    insert_book_service(objects: $objects) {
      returning {
        book_id
        service_id
      }
    }
  }
`;

export const UPDATE_SERVICES = gql`
  mutation AddBookServices(
    $book_id: Int
    $objects: [book_service_insert_input!]!
  ) {
    delete_book_service(where: {book_id: {_eq: $book_id}}) {
      returning {
        book_id
        service_id
      }
    }
    insert_book_service(objects: $objects) {
      returning {
        book_id
        service_id
      }
    }
  }
`;
