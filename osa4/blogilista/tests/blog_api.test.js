const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

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

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

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
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain("new blog");
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "joel",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
