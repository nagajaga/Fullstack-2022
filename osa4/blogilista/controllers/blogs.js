const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");



blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = await Blog.findById(request.params.id);
  const user = await User.findById(decodedToken.id);
  if (blog.user.toString() === user._id.toString()) {
    await blog.remove();
  }

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const id = request.params.id;
  const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });
  updatedBlog
    ? response.status(200).json(updatedBlog)
    : response.status(400).end();
});
module.exports = blogsRouter;
