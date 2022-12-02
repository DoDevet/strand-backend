import client from "../../client";
import {
  deleteToS3,
  deleteToS3Community,
  uploadToS3,
  uploadToS3Community,
} from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (
        _,
        { communityId, id, caption, title, file },
        { loggedInUser }
      ) => {
        let fileUrl;
        const oldPhoto = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          select: {
            file: true,
          },
        });
        if (!oldPhoto) {
          return {
            ok: false,
            error: "No permissions",
          };
        }
        if (file) {
          fileUrl = await uploadToS3Community(
            communityId,
            file,
            loggedInUser.id,
            "uploads"
          );
          deleteToS3Community(
            communityId,
            oldPhoto.file.split("/uploads/")[1],
            "uploads"
          );
          oldPhoto?.file !== null
            ? await deleteToS3(oldPhoto.file.split("/uploads/")[1], "uploads")
            : null;
        } else {
          fileUrl = oldPhoto.file;
        }
        await client.photo.update({
          where: { id },
          data: {
            caption,
            title,
            file: fileUrl,
          },
        });
        return { ok: true, id };
      }
    ),
  },
};
