import {
  GraphQLServer
} from "graphql-yoga";

//type definitions(schema)
const typeDefs = `
    type Query {
      greeting(name: String, location: String): String!
      add(numbers: [Float!]!): Float!
      grades: [Int]!
      aUser: User!
      post: Post!

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
    `

//resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) { //args -> operation arguments which we need, ctx -> context: useful for contextual data, info -> informations about actual operations
      if (args.name && args.location) {
        return `Hello, ${args.name}!. You are from ${args.location}`
      } else {
        return "Hello"
      }
    },
    add(parent, args, ctx, info) { //parent has to be provided, otherwise args will be treated as parent
      if (args.numbers.length === 0){
        return 0
      }
      return args.numbers.reduce((accumulator, currentValue)  => {
        return accumulator + currentValue
        })
    },
    grades(parent, args, cts, info) {
      return [99, 199, 100]
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
    post() {
      return {
        id: "idDelPost123",
        title: "titoloDelPost",
        body: "postBody",
        published: false
      }
    },

  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});