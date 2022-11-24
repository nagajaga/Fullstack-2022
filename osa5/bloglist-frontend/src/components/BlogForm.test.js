import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("adding a new blog works", async () => {
  const mockHandler = jest.fn();

  const { container } = render(<BlogForm addBlog={mockHandler} />);

  const title = container.querySelector("#title");
  const author = container.querySelector("#author");
  const url = container.querySelector("#url");
  const user = userEvent.setup();

  await user.type(title, "fso part 5");
  await user.type(author, "me");
  await user.type(url, "fso.com");
  const button = screen.getByText("create");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("fso part 5");
  expect(mockHandler.mock.calls[0][0].author).toBe("me");
  expect(mockHandler.mock.calls[0][0].url).toBe("fso.com");
});
