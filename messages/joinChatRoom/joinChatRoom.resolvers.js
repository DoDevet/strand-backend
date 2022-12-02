import client from "../../client";

export default {
  Mutation: {
    joinChatRoom: async (_, { roomId }, { loggedInUser }) => {
      const RoomExist = await client.room.findUnique({
        where: { id: roomId },
      });

      if (RoomExist === null) {
        return {
          ok: false,
          error: "no Room",
        };
      }
      const ok = await client.room.findFirst({
        where: {
          id: roomId,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
      ok
        ? await client.room.update({
            where: { id: roomId },
            data: {
              users: {
                disconnect: {
                  id: loggedInUser.id,
                },
              },
            },
          })
        : await client.room.update({
            where: { id: roomId },
            data: {
              users: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });
      return {
        ok: true,
        id: roomId,
      };
    },
  },
};
