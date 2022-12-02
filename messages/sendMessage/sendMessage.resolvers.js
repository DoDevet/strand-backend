import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, roomId, userId }, { loggedInUser }) => {
        // userId 로 메세지를 보낼때
        let room = null;
        if (userId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: "This user does not exist.",
            };
          }
          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });
        } else if (roomId) {
          room = await client.room.findFirst({
            where: {
              id: roomId,
              users: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "find Not room",
            };
          }
        }
        // room을 선택해서 보낼때

        const message = await client.message.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            room: {
              connect: {
                id: room.id,
              },
            },
            payload,
          },
        });
        pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
        return {
          ok: true,
          id: message.id,
        };
      }
    ),
  },
};
