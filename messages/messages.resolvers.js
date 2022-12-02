import { __DirectiveLocation } from "graphql";
import client from "../client";

export default {
  Room: {
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }

      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    userNumber: ({ id }) =>
      client.user.count({ where: { rooms: { some: { id } } } }),
    messages: ({ id }) => client.room.findUnique({ where: { id } }).messages(),
    chatAdmin: ({ id }) =>
      client.room.findUnique({ where: { id } }).chatAdmin(),
    communityName: async ({ communityId }) => {
      const { communityName } = await client.community.findUnique({
        where: {
          id: communityId,
        },
        select: {
          communityName: true,
        },
      });
      return communityName;
    },
    isSubScribe: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
      return Boolean(exists);
    },
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    isAdmin: async ({ userId, roomId }) => {
      const { chatAdminId } = await client.room.findUnique({
        where: {
          id: roomId,
        },
        select: {
          chatAdminId: true,
        },
      });
      return chatAdminId === userId;
    },
  },
};
