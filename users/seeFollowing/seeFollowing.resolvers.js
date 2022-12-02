import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { userName, lastId }) => {
      const ok = await client.user.findUnique({
        where: { userName },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "Not found user",
        };
      }
      const following = await client.user
        .findUnique({
          where: { userName },
        })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

      const totalPages = await client.user.count({
        where: {
          followers: {
            some: { userName },
          },
        },
      });
      return {
        ok: true,
        following,
        totalPages: Math.ceil(totalPages / 5),
      };
    },
  },
};
