import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Notification
        message={errorMessage}
        setMessage={setErrorMessage}
        error={true}
      />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const Blogs = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);


  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const updateBlogs = (updatedBlog) => {
    setBlogs(blogs.map((b)=> b.id === updatedBlog.id ? updatedBlog : b))
  }

  const removeBlog = (removedId) => {
    setBlogs(blogs.filter((b)=> b.id !== removedId))
  }
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
      {[...blogs].sort((a,b) => a.likes < b.likes).map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} removeBlog={removeBlog}/>
      ))}
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  return (
    <div>
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <Blogs user={user} setUser={setUser} />
      )}
    </div>
  );
};

export default App;
