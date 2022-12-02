import client from "../../client";

export default {
  Query: {
    seePhotoComments: async (_, { id, page = 1 }) => {
      if (page === 0) {
        page = 1;
      }
      const photoComments = await client.comment.findMany({
        take: 10,
        skip: (page - 1) * 10,
        where: {
          photo: {
            id,
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      return photoComments;
    },
  },
};
