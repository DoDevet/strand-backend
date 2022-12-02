import { gql } from "apollo-server-express";

export default gql`
  type Query {
    popularFeedPhoto(offset: Int!, communityId: Int!, likesNum: Int): [Photo]
  }
`;
