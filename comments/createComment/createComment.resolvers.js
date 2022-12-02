import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (asdf, { payload, photoId }, { loggedInUser }) => {
        const ok = await client.photo.findFirst({
          where: { id: photoId },
          select: {
            id: true,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Cannot find Photo",
          };
        }
        const newComment = await client.comment.create({
          data: {
            payload,
            photo: {
              connect: {
                id: photoId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });

        return {
          ok: true,
          id: newComment.id,
        };
      }
    ),
  },
};
