import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeFeedMyPhotos(offset: Int!, userId: Int): [Photo]
  }
`;
