import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver((_, { offset, communityId }, { loggedInUser }) =>
      client.photo.findMany({
        take: 10,
        skip: offset,
        where: {
          communityId,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    ),
  },
};
