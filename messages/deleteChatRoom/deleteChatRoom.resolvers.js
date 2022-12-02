import client from "../../client";

export default {
  Mutation: {
    deleteChatRoom: async (_, { id }, { loggedInUser }) => {
      const room = await client.room.findUnique({
        where: {
          id,
        },
        select: {
          chatAdminId: true,
        },
      });
      if (room?.chatAdminId === loggedInUser.id) {
        await client.room.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
          id,
        };
      } else {
        return {
          ok: false,
          id,
        };
      }
    },
  },
};
