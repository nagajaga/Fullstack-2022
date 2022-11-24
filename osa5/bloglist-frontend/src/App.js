import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";

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
