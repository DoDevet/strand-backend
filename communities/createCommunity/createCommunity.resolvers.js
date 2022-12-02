import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createCommunity: protectedResolver(
      async (_, { communityName, communityInfo = "" }, { loggedInUser }) => {
        const searchCommunity = await client.community.findFirst({
          where: {
            communityName,
          },
        });
        if (searchCommunity) {
          return {
            ok: false,
            error: "Exist Community",
          };
        }

        const { userName } = await client.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
        });
        const { id } = await client.community.create({
          data: {
            communityName,
            communityInfo,
            admin: {
              connect: {
                userName,
              },
            },
          },
        });
        return { ok: true, id };
      }
    ),
  },
};
