import mongoose from "mongoose";


const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    newest:{
        type:Boolean,
    }
})


const BlogModel = mongoose.model("blogs",BlogSchema)
export default BlogModel