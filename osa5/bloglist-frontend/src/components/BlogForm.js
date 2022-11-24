import { useState, forwardRef } from "react";
import blogService from "../services/blogs";

const BlogForm = forwardRef(({ setSuccessMessage, setBlogs, blogs }, ref) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    const blog = {
      title,
      author,
      url,
    };
    const createdBlog = await blogService.create(blog);
    ref.current.toggleVisibility();

    setSuccessMessage(`a new blog ${blog.title} added`);
    setTitle("");
    setAuthor("");
    setUrl("");
    setBlogs(blogs.concat(createdBlog));
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
});

BlogForm.displayName = "BlogForm";
export default BlogForm;
