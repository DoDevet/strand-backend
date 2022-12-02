import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editPhoto(
      communityId: Int!
      id: Int!
      title: String
      caption: String
      file: Upload
    ): MutataionResponse!
  }
`;
