import {
  GraphQLServer
} from "graphql-yoga";

const posts =[{
  id:'0',
  title:'First post title',
  body:'First post body',
  published: true
}, {
  id:'1',
  title:'Second post title',
  body:'Second post body',
  published: true
}, {
  id:'2',
  title:'Third post title',
  body:'Third post body',
  published: false
}]


//Demo user data
const users = [{
  id:'1',
  name: 'Enrico',
  email: 'enrico@example.com',
  age: 27
}, {
  id: '2',
  name: 'Sara',
  email: 'sara@email.com'
}, {
  id: '3',
  name: 'Matt',
  email: 'matt@email.com'
}]

//type definitions(schema)
const typeDefs = `
    type Query {
      posts(query: String): [Post!]!
      users(query: String): [User!]!
      myTestUser: User!
      post: Post!
    } 

    type User {
        id: ID!
        name: String!
        age: Int
        employed: Boolean!
        gpa: Float
        email: String!
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
    users(parent, args, ctx, info){
      if (!args.query){
      return users        
      }

      return users.filter((users) => {
        return users.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info){
      if(!args.query){
        return posts
      }

      return posts.filter((posts) => {
        return posts.title.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    myTestUser() {
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
  console.log("The Mock Server is Online!");
});