import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeFeed(offset: Int!, communityId: Int!): [Photo]
  }
`;
