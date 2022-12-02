import client from "../client";

export default {
  Comment: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    user: ({ userId }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          userName: true,
          avatar: true,
          id: true,
        },
      }),
    photo: ({ photoId }) =>
      client.photo.findUnique({
        where: {
          id: photoId,
        },
        select: {
          id: true,
        },
      }),
    commentNumbers: ({ photoId }) =>
      client.comment.count({ where: { photoId } }),
  },
};
