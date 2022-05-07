import {React,useEffect,useState} from 'react';
import axios from "axios";
import Blog from "./Blog.js";

const Blogs = () => {
  const [blogs, setBlogs] = useState();  
  const id = localStorage.getItem("userId");
  const sendRequest = async() => {
    const res = await axios
    .get("http://localhost:5000/api/blog")
    .catch(err => console.log(err));
  const data = await res.data;
  return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
},[]);
console.log(blogs);
return (
    <div>{blogs && blogs.map((blog,index) => (<Blog 
      isUser = { id === blog.user._id} 
      id = {id}
      key={index} 
      title={blog.title} 
      description={blog.description} 
      imageURL={blog.image} 
      userName={blog.user.name} />))}</div>
  )
}

export default Blogs