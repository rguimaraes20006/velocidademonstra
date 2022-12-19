import {gql} from '@apollo/client';

export const CREATE_RADAR = gql`
  mutation CreateRadar(
    $name: String!
    $longitude: String!
    $latitude: String!
  ) {
    createRadar(lng: $longitude, lat: $latitude, name: $name) {
      id
      lat
      lng
      name
    }
  }
`;
