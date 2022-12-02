import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    deleteChatRoom(id: Int!): MutataionResponse!
  }
`;
