import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editCommunity(
      id: Int!
      communityInfo: String
      popularSetting: Int
    ): MutataionResponse!
  }
`;
