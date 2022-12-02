import client from "../../client";
import { deleteToS3Community } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
          file: true,
          communityId: true,
        },
      });
      const [{ id: adminId }] = await client.community
        .findFirst({
          where: {
            id: photo.communityId,
          },
        })
        .admin();
      if (!photo) {
        return {
          ok: false,
          error: "Photo not Found",
        };
      } else if (
        adminId !== loggedInUser.id &&
        photo.userId !== loggedInUser.id
      ) {
        return {
          ok: false,
          error: "Not authorized",
        };
      } else {
        const filePath = photo.file.split(`/uploads/${photo.communityId}/`)[1];
        deleteToS3Community(photo.communityId, filePath, "uploads");
        await client.photo.delete({ where: { id } });
      }
      return {
        ok: true,
      };
    }),
  },
};
