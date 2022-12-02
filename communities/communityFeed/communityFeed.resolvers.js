import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    communityFeed: protectedResolver((_, __, { loggedInUser }) =>
      client.community.findMany({
        where: {
          OR: [
            {
              users: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
            {
              admin: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          ],
        },
      })
    ),
  },
};

/**where: {
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      }) */
