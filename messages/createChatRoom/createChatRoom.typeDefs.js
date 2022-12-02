import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createChatRoom(comuId: Int!, title: String!): MutataionResponse!
  }
`;
