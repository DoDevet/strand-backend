import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { userName }, { loggedInUser }) => {
      const { id } = await client.user.findUnique({ where: { userName } });
      if (!id) {
        return {
          ok: false,
          error: "user does not exist",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              userName,
            },
          },
        },
      });
      return {
        ok: true,
        id,
      };
    }),
  },
};
