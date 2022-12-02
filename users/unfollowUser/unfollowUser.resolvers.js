import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { userName }, { loggedInUser }) => {
        const { id } = await client.user.findUnique({
          where: { userName },
        });

        if (!id) {
          return {
            ok: false,
            error: "user Not Found",
          };
        }
        await client.user.update({
          where: { id: loggedInUser.id },

          data: {
            following: {
              disconnect: { userName },
            },
          },
        });
        return {
          ok: true,
          id,
        };
      }
    ),
  },
};
