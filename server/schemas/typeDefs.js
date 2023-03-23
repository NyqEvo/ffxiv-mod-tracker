const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String
    email: String

}
type Mod {
    _id: ID!
    name: String
    author: String
    link: String
    downloadDate: String
    archiveId: Int
}
type Auth {
    token: ID!
    user: User
}
type Query {
    me: User
}
input userInput {
    userId: String!
    username: String!
    email: String!
}
input modInput {
    modId: String!
    name: String!
    link: String!
    archiveId: Int!
    downloadDate: String
}`

module.exports = typeDefs;