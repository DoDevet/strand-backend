import client from "../../client";

export default {
  Query: {
    searchPhotos: (_, { comuId, keyword }) =>
      client.photo.findMany({
        where: {
          OR: [
            {
              caption: {
                startsWith: keyword,
              },
            },
            {
              title: {
                startsWith: keyword,
              },
            },
          ],
          communityId: comuId,
        },
      }),
  },
};
