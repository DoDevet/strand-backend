import client from "../../client";

export default {
  Query: {
    seeRoomInCommunity: (_, { id }) =>
      client.community
        .findUnique({
          where: {
            id,
          },
        })
        .chatRooms(),
  },
};
