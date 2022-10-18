const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let token = null;
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("hunter2", 10);
  const user = await new User({ username: "name", passwordHash }).save();
  const userForToken = { username: "name", id: user.id };
  return (token = jwt.sign(userForToken, process.env.SECRET));
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs have id", async () => {
  const response = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  for (const blog of response.body) {
    expect(blog.id).toBeDefined();
  }
});
test("there are two blogs", async () => {
  const response = await api.get("/api/blogs").set("Authorization", `Bearer ${token}`);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs").set("Authorization", `Bearer ${token}`);

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain("testing");
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "new blog",
    author: "newblogger",
    url: "google.com/newblogs",
    likes: 6,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs").set("Authorization", `Bearer ${token}`);

  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain("new blog");
});

test("blog without likes has 0 likes", async () => {
  const newBlog = {
    title: "nolikes",
    author: "joel",
    url: "nolikes.com",
  };

  await api.post("/api/blogs").set("Authorization", `Bearer ${token}`).send(newBlog).expect(201);

  const response = await api.get("/api/blogs").set("Authorization", `Bearer ${token}`);

  for (const blog of response.body) {
    if (blog.title === "nolikes") {
      expect(blog.likes).toBe(0);
    }
  }
});

test("blog without title", async () => {
  const newBlog = {
    author: "joel",
    url: "nolikes.com",
    likes: 5,
  };

  await api.post("/api/blogs").set("Authorization", `Bearer ${token}`).send(newBlog).expect(400);

  const response = await api.get("/api/blogs").set("Authorization", `Bearer ${token}`);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blog without url", async () => {
  const newBlog = {
    title: "testinggg",
    author: "joel",
    likes: 5,
  };

  await api.post("/api/blogs").set("Authorization", `Bearer ${token}`).send(newBlog).expect(400);

  const response = await api.get("/api/blogs").set("Authorization", `Bearer ${token}`);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("removing a single blog works", async () => {
  const response = await api.get("/api/blogs").set("Authorization", `Bearer ${token}`);
  await api.delete(`/api/blogs/${response.body[0].id}`).set("Authorization", `Bearer ${token}`).expect(204);
  const after = await api.get("/api/blogs").set("Authorization", `Bearer ${token}`);
  expect(after.body).toHaveLength(response.body.length - 1);
});

test("updating a blog works", async () => {
  const response = await api.get("/api/blogs").set("Authorization", `Bearer ${token}`);
  const updatedBlog = {
    title: "updatedTitle",
    author: "updatedAuthor",
    url: "www.updates.com",
    likes: 5,
    id: response.body[0].id,
  };
  await api
    .put(`/api/blogs/${response.body[0].id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(updatedBlog)
    .expect(200);
  const after = await api.get("/api/blogs").set("Authorization", `Bearer ${token}`);
  expect(after.body).toContainEqual(updatedBlog);
});
afterAll(() => {
  mongoose.connection.close();
});
