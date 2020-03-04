import {
  GraphQLServer
} from "graphql-yoga";

//type definitions(schema)
const typeDefs = `
    type Query {
      greeting(name: String, location: String): String!
      aUser: User!
      post: Post!
      add(a: Float!, b: Float!): Float!

    } 

    type User {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
    }


    `;

//resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info){ //args -> operation arguments which we need, ctx -> context: useful for contextual data, info -> informations about actual operations
      if(args.name && args.location) {
        return `Hello, ${args.name}!. You are from ${args.location}`
      } else {
        return "Hello"
      }
    },
    aUser() {
      return {
        id: "abc123",
        name: "Enrico",
        age: 33,
        employed: true,
        gpa: null
      }
    },
    post(){
      return {
        id: "idDelPost123",
        title: "titoloDelPost",
        body: "postBody", 
        published: false
      }
    },
    add(parent, args){ //parent has to be provided, otherwise args will be treated as parent
      return args.a + args.b 
    }
  }
}

const server = new GraphQLServer({
  typeDefs, 
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});