import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeedMyPhotos: protectedResolver(
      (_, { offset, userId }, { loggedInUser }) =>
        client.photo.findMany({
          take: 10,
          skip: offset,
          where: {
            user: {
              id: userId,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        })
    ),
  },
};
