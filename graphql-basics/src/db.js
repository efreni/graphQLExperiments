//Demo user data
const comments = [
  {
    id: "0",
    text: "First Comment",
    author: "1",
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
    author: "1",
    post: "10"
  }
];

const posts = [
  {
    id: "10",
    title: "First post title",
    body: "First post body",
    published: true,
    author: "3"
  },
  {
    id: "11",
    title: "Second post title",
    body: "Second post body",
    published: true,
    author: "3"
  },
  {
    id: "12",
    title: "Third post title",
    body: "Third post body",
    published: false,
    author: "3"
  }
];

const users = [
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

const db = {
  users,
  posts,
  comments
};

export { db as default };
