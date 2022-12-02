import { gql } from "apollo-server-express";

export default gql`
  type MutataionResponse {
    ok: Boolean!
    id: Int
    error: String
  }
`;
