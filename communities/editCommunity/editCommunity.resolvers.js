import client from "../../client";

export default {
  Mutation: {
    editCommunity: async (
      _,
      { id, popularSetting, communityInfo },
      { loggedInUser }
    ) => {
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
          error: "No permission",
        };
      }
      await client.community.update({
        where: { id },
        data: {
          communityInfo,
          popularSetting,
        },
      });
      return { ok: true, id };
    },
  },
};
