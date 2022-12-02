import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const ok = await client.photo.findUnique({ where: { id } });
      if (!ok) {
        return { ok: false, error: "Photo not found" };
      }

      const like = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
      });
      if (like) {
        await client.like.delete({ where: { id: like.id } });
        await client.photo.update({
          where: {
            id,
          },
          data: {
            likesNum: {
              decrement: 1,
            },
          },
        });
        return {
          ok: true,
          message: "Unlike!",
        };
      } else {
        await client.like.create({
          data: {
            photo: {
              connect: { id },
            },
            user: {
              connect: { id: loggedInUser.id },
            },
          },
        });
        await client.photo.update({
          where: {
            id,
          },
          data: {
            likesNum: {
              increment: 1,
            },
          },
        });
        return {
          ok: true,
          message: "Like!",
        };
      }
    }),
  },
};
