import { gql } from "apollo-server-express";

export default gql`
  type ToggleLikeResult {
    ok: Boolean!
    message: String
    error: String
  }
  type Mutation {
    toggleLike(id: Int!): ToggleLikeResult
  }
`;
