import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    id: Int!
    user: User!
    photo: Photo!
    payload: String!
    isMine: Boolean!
    commentNumbers: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
