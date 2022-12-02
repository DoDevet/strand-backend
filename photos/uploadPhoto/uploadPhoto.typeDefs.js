import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    uploadPhoto(
      communityId: Int!
      file: Upload!
      title: String!
      caption: String
    ): Photo
  }
`;
