import { gql } from "apollo-server";

export default gql`
  type Query {
    searchPhotos(comuId: Int!, keyword: String!): [Photo]
  }
`;
