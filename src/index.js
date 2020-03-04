import { GraphQLServer } from "graphql-yoga";

//type definitions(schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
    `;

//resolvers
const resolvers = {
  Query: {
    hello() {
      return "This is my first query";
    },
    name() {
      return "Enrico F";
    },
    location() {
      return "Florence";
    },
    bio() {
      return "Junior Software Developer";
    }
  }
};

const server = new GraphQLServer({
  typeDefs, // it equals to - typeDefs: typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});
