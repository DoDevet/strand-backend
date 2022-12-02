import { gql } from "apollo-server-express";

export default gql`
  type Message {
    id: Int!
    payload: String!
    read: Boolean!

    user: User!
    room: Room!
    isMine: Boolean!
    isAdmin: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Room {
    id: Int!
    users: [User]
    userNumber: Int!
    unreadTotal: Int!
    messages: [Message]
    isSubScribe: Boolean!
    chatAdmin: User!
    title: String!
    community: Community!
    communityName: String!
    createdAt: String!
    updatedAt: String!
  }
`;
/*
  Room:{
      users : User[]
      message: message[]
  }

  Message:{
      user : User,
      room : Room
  }
*/
