import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    popularFeedPhoto: protectedResolver(
      async (_, { offset, communityId, likesNum }, { loggedInUser }) => {
        const { popularSetting } = await client.community.findUnique({
          where: { id: communityId },
          select: {
            popularSetting: true,
          },
        });

        return client.photo.findMany({
          take: 10,
          skip: offset,
          where: {
            communityId,
            likesNum: {
              gte: parseInt(popularSetting),
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
    ),
  },
};
