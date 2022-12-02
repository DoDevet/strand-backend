import { gql } from "apollo-server-express";

export default gql`
  type Community {
    id: Int!
    communityName: String!
    communityInfo: String!

    chatRoom: [Room]
    users: [User]
    photos: [Photo]
    admin: [User]
    popularSetting: Int!
    createdAt: String!
    updatedAt: String!
    isSubscribe: Boolean!
    isAdmin: Boolean!
  }
`;
