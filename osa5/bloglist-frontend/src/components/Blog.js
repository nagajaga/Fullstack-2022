import { useState } from "react";

const Blog = ({ blog, like, remove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const detailStyle = {
    marginTop: "2px",
    marginBottom: "2px",
  };

  const [details, setDetails] = useState(false);

  return (
    <div style={blogStyle}>
      <div>
        <b>{blog.title}</b> {blog.author}
        <button onClick={() => setDetails(!details)}>
          {details ? "hide" : "view"}
        </button>
      </div>
      <div style={{ display: details ? "inline" : "none" }}>
        <p style={detailStyle}>{blog.url}</p>
        <p style={detailStyle}>
          likes {blog.likes}
          <button onClick={() => like(blog)}>like</button>
        </p>
        <p style={detailStyle}>{blog.user.name}</p>
        <button onClick={() => remove(blog)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
