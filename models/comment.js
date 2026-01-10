import mongoose, { now } from "mongoose";

const commentSchema = mongoose.Schema({
    productId:{
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
        
    },

    name:{
        type:String,
        required:true,
    },

    comment:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },

    createAt:{
        type:Date,
        default:Date.now
    }


})

const Comment =mongoose.model("Comments",commentSchema);
export default Comment;