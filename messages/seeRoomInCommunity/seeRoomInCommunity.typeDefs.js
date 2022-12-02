import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeRoomInCommunity(id: Int!): [Room]
  }
`;
