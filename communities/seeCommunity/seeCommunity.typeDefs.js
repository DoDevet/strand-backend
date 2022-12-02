import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeCommunity(id: Int!): Community
  }
`;
