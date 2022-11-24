
import {useState} from "react"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const detailStyle = {
    marginTop: "2px",
    marginBottom: "2px"
  };

  const [details, setDetails] = useState(false)


  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetails(!details)} >{details ? "hide":"view"}</button>
      </div> 
      <div style={{display: details ?"inline":"none"}}>
        <p style = {detailStyle}>{blog.url}</p>
        <p style = {detailStyle}>likes {blog.likes}</p>
        <p style = {detailStyle}>{blog.user.name}</p>
      </div>
    </div>
      
  );
};


export default Blog