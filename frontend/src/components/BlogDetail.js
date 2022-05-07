import {React,useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import {Typography,Box,Button,TextField,InputLabel} from '@mui/material';
import {useNavigate} from 'react-router-dom';
const labelStyles = {mb:1,mt:2,fontSize:"24px",fontWeight:"bold"};

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs,setInputs] = useState({title:"",description:"",imageURL:""})  
  const handleChange = (e) => {
    setInputs((prevState) =>({
      ...prevState,
      [e.target.name]:e.target.value,
    }));
  }
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(()=>{
    fetchDetails().then(data=>{
      setBlog(data.blog)
      setInputs({title:data.blog.title,description:data.blog.description,imageURL:data.blog.image})
    });
  },[id]);
  const sendRequest = async () =>{
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description: inputs.description,
      image:inputs.imageURL
    }).catch(err=>console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  }
  console.log(blog);
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs);
    sendRequest()
    .then(data=>console.log(data))
    .then(()=>navigate("/myBlogs/"));
  }
  return (<div>
    {inputs && 
    <form onSubmit={handleSubmit}>
    <Box border={3} borderColor='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,79,121,1) 35%, rgba(0,212,255,1) 100%);' borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin="auto" marginTop={3} display="flex" flexDirection={"column"} width={"80%"}>
      <Typography fontWeight={"bold"} padding={3} color="grey" variant="h4" textAlign={"center"}>Post Your Blog</Typography>
        <InputLabel sx={labelStyles}>Title</InputLabel>
        <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant="outlined" />
        <InputLabel sx={labelStyles}>Description</InputLabel>
        <TextField name="description" value={inputs.description} onChange={handleChange} margin="normal" variant="outlined" />
        <InputLabel sx={labelStyles}>ImageURL</InputLabel>
        <TextField name="imageURL" value={inputs.imageURL} onChange={handleChange} margin="normal" variant="outlined" />          
        <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>
    </Box>
  </form>}</div>
  )
}

export default BlogDetail