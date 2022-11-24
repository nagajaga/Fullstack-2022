import { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog,updateBlogs }) => {
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

  const like = async () => {
    const likeBlog = {
      likes: blog.likes + 1,
    };
    const updatedBlog = await blogService.update(blog.id,likeBlog);
    updateBlogs(updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetails(!details)}>
          {details ? "hide" : "view"}
        </button>
      </div>
      <div style={{ display: details ? "inline" : "none" }}>
        <p style={detailStyle}>{blog.url}</p>
        <p style={detailStyle}>
          likes {blog.likes}
          <button onClick={like}>like</button>
        </p>
        <p style={detailStyle}>{blog.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;
