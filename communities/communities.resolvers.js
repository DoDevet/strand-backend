import client from "../client";

export default {
  Community: {
    users: ({ id }) => client.community.findUnique({ where: { id } }).users(),
    admin: ({ id }) => client.community.findUnique({ where: { id } }).admin(),
    photos: ({ id }) => client.community.findUnique({ where: { id } }).photos(),
    isSubscribe: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.findFirst({
        where: {
          id: loggedInUser.id,
          communities: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    isAdmin: async ({ id }, _, { loggedInUser }) => {
      const exist = await client.community.findFirst({
        where: {
          id,
          admin: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
      return Boolean(exist);
    },
  },
};
