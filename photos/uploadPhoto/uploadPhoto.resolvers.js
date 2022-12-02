import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";
import { uploadToS3Community } from "../../shared/shared.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { communityId, file, caption, title }, { loggedInUser }) => {
        let hastagsObjs = [];
        if (caption) {
          hastagsObjs = processHashtags(caption);
        }
        const fileUrl = await uploadToS3Community(
          communityId,
          file,
          loggedInUser.id,
          "uploads"
        );
        return client.photo.create({
          data: {
            file: fileUrl,
            title,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            community: {
              connect: {
                id: communityId,
              },
            },
            ...(hastagsObjs.length > 0 && {
              hashtags: { connectOrCreate: hastagsObjs },
            }),
          },
        });
        //save the photo With the parsed hashtags
        //add the photo to the hashtags
      }
    ),
  },
};
