import { GraphQLServer } from "graphql-yoga";

import uuidv4 from "uuid/v4";

//Demo user data
let comments = [
  {
    id: "0",
    text: "First Comment",
    author: "3",
    post: "10"
  },
  {
    id: "1",
    text: "Second Comment",
    author: "2",
    post: "11"
  },
  {
    id: "2",
    text: "Third Comment",
    author: "1",
    post: "12"
  },
  {
    id: "3",
    text: "Forth Comment",
    author: "2",
    post: "10"
  }
];

let posts = [
  {
    id: "10",
    title: "First post title",
    body: "First post body",
    published: true,
    author: "1"
  },
  {
    id: "11",
    title: "Second post title",
    body: "Second post body",
    published: true,
    author: "1"
  },
  {
    id: "12",
    title: "Third post title",
    body: "Third post body",
    published: false,
    author: "3"
  }
];

let users = [
  {
    id: "1",
    name: "Enrico",
    email: "enrico@example.com",
    age: 27
  },
  {
    id: "2",
    name: "Sara",
    email: "sara@email.com"
  },
  {
    id: "3",
    name: "Matt",
    email: "matt@email.com"
  }
];

//type definitions(schema)
const typeDefs = `
  type Query {
    posts(query: String): [Post!]!
    users(query: String): [User!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput): Post!
    createComment(data: CreateCommentInput): Comment!
  } 

  input CreateUserInput {
    name: String!
    email: String!
     age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
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
    `;

//resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        return post.title.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    comments(parent, args, ctx, info) {
      if (!args.query) {
        return comments;
      }
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author == parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
      });
    }
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.data.email);
      if (emailTaken) {
        throw new Error("Email already taken");
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      users.push(user);

      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex(user => user.id === args.id);

      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const deletedUsers = users.splice(userIndex, 1);

      posts = posts.filter(post => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter(comment => comment.post !== post.id);
        }

        return !match;
      });

      comments = comments.filter(comment => comment.author !== args.id);

      return deletedUsers[0];
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);

      if (!userExists) {
        throw new Error("User not found");
      }

      const post = {
        id: uuidv4(),
        ...args.data
      };

      posts.push(post); //why am I pushing this?

      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);

      const postExists = posts.some(
        post => post.id === args.data.post && post.published
      );

      if (!userExists) {
        throw Error("The specified user doesn't exist");
      }
      if (!postExists) {
        throw Error("The specified post doesn't exist");
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      };

      comments.push(comment); //why am I pushing this?

      return comment;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The Mock Server is Online!");
});
