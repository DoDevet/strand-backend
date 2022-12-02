import { gql } from "apollo-server-express";

export default gql`
  type Query {
    searchCommunity(offset: Int, keyword: String): [Community]
  }
`;
