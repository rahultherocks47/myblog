import {React,useState} from 'react'
import {Typography,Box,Button,TextField,} from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {authActions} from '../store/index.js';
import {useNavigate} from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [inputs,setInputs] = useState({name:"",email:"",password:""})
  const [isSignup, setIsSignup] = useState(false)

  const handleChange = (e) => {
    setInputs((prevState) =>({
      ...prevState,
      [e.target.name]:e.target.value,
    }));
  };  
  const sendRequest  = async(type="login") => {
 const res = await axios.post(`http://localhost:5000/api/user/${type}`,{
    name: inputs.name, 
    email: inputs.email,
    password: inputs.password
 }).catch( err => console.log(err));
 const data = await res.data; 
 return data;
};
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("From handleSubmit",inputs);    
    if(isSignup){    
    sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
    .then(()=>dispath(authActions.login())).then(()=>navigate("/blogs"))
    .then((data) =>console.log(data));
    } else{
      sendRequest()
      .then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispath(authActions.login())).then(()=>navigate("/blogs"))
      .then((data) =>console.log(data));
    }
  };
  return (
    <div><form onSubmit={handleSubmit}>
      <Box 
      maxWidth={400} 
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent = {"center"}
      boxShadow = "10px 10px 20px #ccc"
      padding = {3}
      margin = "auto"
      marginTop = {5}
      borderRadius ={5}
      >
        <Typography variant="h2">Login</Typography>
        { isSignup && <TextField name="name" onChange={handleChange} value={inputs.name} placeholder="Name" margin="normal" /> }
        <TextField name="email" onChange={handleChange} value={inputs.email} placeholder="Email" margin="normal" type={"email"} />
        <TextField name="password" onChange={handleChange} value={inputs.password} placeholder="Password" margin="normal" type={"password"} />
        <Button type="submit" variant="contained" sx={{borderRadius:3,marginTop:3}} color="warning">{isSignup ? "Signup" : "Login"}</Button>
        <Button sx={{borderRadius:3,marginTop:3}} onClick={()=> setIsSignup(!isSignup)}>Change To {isSignup ? "Login" : "Signup"}</Button>
      </Box>
      
      </form></div>
  )
}

export default Auth