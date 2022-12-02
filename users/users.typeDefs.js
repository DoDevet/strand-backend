import { gql } from "apollo-server";
{
  //패스워드는 GraphQL에 묻지 않는다.
}
export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    photos: [Photo]
    totalPhotos: Int!
    totalComments: Int!
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    myCommunity: [Community]
    subCommunity: [Community]
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
