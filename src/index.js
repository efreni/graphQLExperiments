import { GraphQLServer } from "graphql-yoga";

// 5 Scalar types = String, Boolean, Int, Float, ID
// scalar type means that cointains a single value type (differently from an object for ex)

//type definitions(schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
        title: String!
        price: Int!
        releaseYear: Int
        rating: Int
        inStock: Boolean!
    } 
    `; //! <- means it has to return always a value of that type, otherwise can be null

//resolvers
const resolvers = {
  Query: {
    id() {
      return "abc123";
    },
    name() {
      return "Enrico";
    },
    age() {
      return 33;
    },
    employed() {
      return true;
    },
    gpa() {
      return null;
    },
    title() {
      return "An Item Name";
    },
    price() {
      return 100;
    },
    releaseYear() {
      return null;
    },
    rating() {
      return null;
    },
    inStock() {
      return true;
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
