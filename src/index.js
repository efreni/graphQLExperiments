import { GraphQLServer } from "graphql-yoga";
import db from "./db";

import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/customObjects/User";
import Post from "./resolvers/customObjects/Post";
import Comment from "./resolvers/customObjects/Comment";

//resolvers
const resolvers = {};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment
  },
  context: {
    db
  }
});

server.start(() => {
  console.log("The Mock Server is Online!");
});
