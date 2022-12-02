import fs from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { deleteToS3, uploadToS3 } from "../../shared/shared.utils";
require("dotenv").config();
export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          userName,
          email,
          password: newPassword,
          bio,
          avatar,
        },
        { loggedInUser }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          const deleteAvatar = await client.user.findUnique({
            where: {
              id: loggedInUser.id,
            },
            select: {
              avatar: true,
            },
          });
          avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");

          deleteAvatar?.avatar !== null
            ? await deleteToS3(
                deleteAvatar.avatar.split("/avatars/")[1],
                "avatars"
              )
            : null;
          /*const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = fs.createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`;
          */
        }
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }

        if (userName) {
          const existUser = await client.user.findUnique({
            where: {
              userName: userName,
            },
            select: {
              id: true,
            },
          });

          if (existUser && existUser.id !== loggedInUser.id) {
            return {
              ok: false,
              error: "Already Exist Username",
            };
          }
        }
        if (email) {
          const existEmail = await client.user.findUnique({
            where: {
              email,
            },
            select: {
              id: true,
            },
          });
          if (existEmail && existEmail.id !== loggedInUser.id) {
            return { ok: false, error: "Already Exist Email" };
          }
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            userName,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update Profile",
          };
        }
      }
    ),
  },
};
