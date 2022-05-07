import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);
mongoose
.connect("mongodb+srv://rahultherocks48:123$rocK@cluster0.nvzxf.mongodb.net/sample_restaurants?retryWrites=true&w=majority")
.then(() => app.listen(5000))
.then((console.log("DB Connected and running on localhost at 5000")))
.catch((err)=> console.log(err));

// app.use("/api",(req,res,next)=>{
    
//     res.send("Hello World!");
// }
// );
