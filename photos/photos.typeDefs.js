import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    user: User!
    title: String!
    caption: String
    file: String!
    hashtags: [Hashtag]
    likes: Int!
    likesNum: Int!
    updatedAt: String!
    createdAt: String!
    isMine: Boolean!
    isLiked: Boolean!
    communityId: Int!
    commentNumber: Int!
    comments: [Comment]
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String
  }
`;
