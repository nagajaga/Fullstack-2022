import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "me",
    url: "asdf.com",
    likes: 0,
    user: { name: "joel" },
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();
});

test("renders all information when button is pressed", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "me",
    url: "asdf.com",
    likes: 0,
    user: { name: "joel" },
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  screen.getByText(blog.title);
  screen.getByText(blog.author);
  screen.getByText(blog.url);
  screen.getByText("likes 0");
  screen.getByText(blog.user.name);
});
