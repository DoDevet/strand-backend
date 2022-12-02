import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    joinCommunity(id: Int!): Community
  }
`;
