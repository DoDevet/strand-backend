import client from "../../client";

export default {
  Query: {
    searchCommunity: async (_, { keyword, offset }) =>
      client.community.findMany({
        take: 10,
        skip: offset,
        where: {
          communityName: {
            startsWith: keyword,
          },
        },
      }),
  },
};
