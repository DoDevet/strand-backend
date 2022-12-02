import client from "../../client";

export default {
  Mutation: {
    joinCommunity: async (_, { id }, { loggedInUser }) => {
      const ok = await client.community.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });

      return ok
        ? client.community.update({
            where: { id },
            data: {
              users: {
                disconnect: {
                  id: loggedInUser.id,
                },
              },
            },
          })
        : client.community.update({
            where: { id },
            data: {
              users: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });
    },
  },
};
