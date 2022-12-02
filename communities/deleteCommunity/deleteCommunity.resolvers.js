import client from "../../client";
import { deleteComuPhoto } from "../../shared/shared.utils";

export default {
  Mutation: {
    deleteCommunity: async (_, { id }, { loggedInUser }) => {
      const ok = await client.community.findFirst({
        where: {
          id,
          admin: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
      if (!ok) {
        return {
          ok: false,
        };
      }
      await client.community.delete({
        where: {
          id,
        },
      });
      deleteComuPhoto("uploads", id);
      return {
        ok: true,
        id,
      };
    },
  },
};
