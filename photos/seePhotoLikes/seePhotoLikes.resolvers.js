import client from "../../client";

export default {
  Query: {
    seePhotoLikes: async (_, { id }) => {
      /*const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
      });
      */
      //return likes.map((users) => users.user);
      return await client.user.findMany({
        where: {
          likes: {
            some: {
              photoId: id,
            },
          },
        },
      });
    },
  },
};
