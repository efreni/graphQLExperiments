import {
  GraphQLServer
} from "graphql-yoga";

import uuidv4 from "uuid/v4"

//Demo user data
const comments = [{
  id: '0',
  text: "First Comment",
  author: "3",
  post: '10'
}, {
  id: '1',
  text: "Second Comment",
  author: "2",
  post: '11'
}, {
  id: '2',
  text: "Third Comment",
  author: "1",
  post: '12'
}, {
  id: '3',
  text: "Forth Comment",
  author: "2",
  post: '10'
}]

const posts = [{
  id: '10',
  title: 'First post title',
  body: 'First post body',
  published: true,
  author: '1'
}, {
  id: '11',
  title: 'Second post title',
  body: 'Second post body',
  published: true,
  author: '1'
}, {
  id: '12',
  title: 'Third post title',
  body: 'Third post body',
  published: false,
  author: '3'
}]

const users = [{
  id: '1',
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
    comments: [Comment!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    createComment(text: String!, author: ID!, post: ID! ): Comment!
  } 

  type User {
    id: ID!
    name: String!
    age: Int
    email: String!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
    `

//resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }

      return users.filter((users) => {
        return users.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }

      return posts.filter((posts) => {
        return posts.title.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    comments(parent, args, ctx, info) {
      if (!args.query) {
        return comments
      }
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author == parent.id
      })

    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
      })

    }
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => {
        return user.email === args.email
      })
      if (emailTaken) {
        throw new Error('Email already taken')
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age
      }

      users.push(user)

      return user
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => {
        return user.id === args.author
      })
      
      if(!userExists){
        throw new Error("User not found")
      }

      const post = {
        id: uuidv4(),
        title: args.title,
        body:args.body,
        published: args.published,
        author: args.author
      }

      posts.push(post) //why am I pushing this?
      
      return post
      
    },
    createComment(parent, args, ctx, info){
      const userExists = users.some((user) => {
        return user.id === args.author
      })

      const postExists = posts.some((post) => {
        return post.id === args.post && post.published
      })
      
      if(!userExists){
        throw Error("The specified user doesn't exist")
      }
      if(!postExists){
        throw Error("The specified post doesn't exist")
      }

      const comment = {
        id: uuidv4(),
        text: args.text,
        author: args.author,
        post: args.post
      }

      comments.push(comment) //why am I pushing this?

      return comment

    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The Mock Server is Online!");
});