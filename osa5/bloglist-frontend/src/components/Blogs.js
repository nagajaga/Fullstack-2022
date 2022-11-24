import { useState, useEffect, useRef } from "react";
import blogService from "../services/blogs";
import Notification from "./Notification";
import Togglable from "./Togglable";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const Blogs = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const updateBlogs = (updatedBlog) => {
    setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
  };

  const removeBlog = (removedId) => {
    setBlogs(blogs.filter((b) => b.id !== removedId));
  };

  const like = async (blog) => {
    const likeBlog = {
      likes: blog.likes + 1,
    };
    const updatedBlog = await blogService.update(blog.id, likeBlog);
    updateBlogs(updatedBlog);
  };

  const remove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      removeBlog(blog.id);
    }
  };

  const addBlog = async (blog) => {
    const createdBlog = await blogService.create(blog);
    blogFormRef.current.toggleVisibility();
    setSuccessMessage(`a new blog ${blog.title} added`);
    setBlogs(blogs.concat(createdBlog));
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

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
        <BlogForm addBlog={addBlog}></BlogForm>
      </Togglable>
      {[...blogs]
        .sort((a, b) => a.likes < b.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} like={like} remove={remove} />
        ))}
    </div>
  );
};

export default Blogs;
