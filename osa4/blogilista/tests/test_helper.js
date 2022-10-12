const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "testitle",
    author: "joel",
    url: "google.com",
    likes: 3,
  },
  {
    title: "testing",
    author: "person",
    url: "youtube.com",
    likes: 2,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ ...initialBlogs[0], title: "willremovethissoon" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
