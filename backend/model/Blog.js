import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type: String,
        requried: true,
    },
    description:{
        type: String,
        requried: true,
    },
    image:{
        type: String,
        requried: true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        requried: true,
    }
});

export default mongoose.model("Blog",blogSchema);
//blogs