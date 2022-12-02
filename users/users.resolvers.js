import client from "../client";

export default {
  User: {
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          userName: loggedInUser.userName,
          following: {
            some: { id },
          },
        },
      });

      return Boolean(exists);
    },

    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },

    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: { id },
          },
        },
      }),

    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: { id },
          },
        },
      }),
    totalPhotos: ({ id }) =>
      client.photo.count({
        where: {
          user: {
            id,
          },
        },
      }),
    totalComments: ({ id }) =>
      client.comment.count({
        where: {
          userId: id,
        },
      }),
    photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),
    myCommunity: ({ id }) => client.user.findUnique({ where: { id } }).admin(),
    subCommunity: ({ id }) =>
      client.user.findUnique({ where: { id } }).communities(),
  },
};
