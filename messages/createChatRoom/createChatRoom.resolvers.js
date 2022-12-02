import client from "../../client";

export default {
  Mutation: {
    createChatRoom: async (_, { comuId, title }, { loggedInUser }) => {
      const chatRoom = await client.room.create({
        data: {
          title,
          community: {
            connect: {
              id: comuId,
            },
          },
          users: {
            connect: {
              id: loggedInUser.id,
            },
          },
          chatAdmin: {
            connect: {
              id: loggedInUser.id,
            },
          },
        },
      });
      if (chatRoom) {
        return { ok: true, id: chatRoom.id };
      }
    },
  },
};
