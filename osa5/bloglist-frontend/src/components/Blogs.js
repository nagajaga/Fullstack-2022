import { useState, useEffect, useRef } from "react";
import blogService from "../services/blogs";
import Notification from "./Notification";
import Togglable from "./Togglable";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const Blogs = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const updateBlogs = (updatedBlog) => {
    setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
  };

  const removeBlog = (removedId) => {
    setBlogs(blogs.filter((b) => b.id !== removedId));
  };
  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const blogFormRef = useRef();

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={successMessage}
        setMessage={setSuccessMessage}
        error={false}
      />
      <p>
        {user.name} has logged in<button onClick={logout}>logout</button>{" "}
      </p>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          setSuccessMessage={setSuccessMessage}
          setBlogs={setBlogs}
          blogs={blogs}
          ref={blogFormRef}
        ></BlogForm>
      </Togglable>
      {[...blogs]
        .sort((a, b) => a.likes < b.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlogs={updateBlogs}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );
};

export default Blogs;
