import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const blog = {
      title,
      author,
      url,
    };
    setTitle("");
    setAuthor("");
    setUrl("");

    addBlog(blog);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          id= "title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id= "author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id = "url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

BlogForm.displayName = "BlogForm";
export default BlogForm;
