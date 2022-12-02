import { gql } from "apollo-server-express";
import client from "../../client";

export default {
  Query: {
    seeCommunity: (_, { id }, { loggedInUser }) =>
      client.community.findUnique({
        where: { id },
      }),
  },
};
