import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createCommunity(
      communityName: String!
      communityInfo: String
    ): MutataionResponse!
  }
`;
