import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    comuAdminFeed: protectedResolver((_, __, { loggedInUser }) =>
      client.community.findMany({
        where: {
          admin: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};
