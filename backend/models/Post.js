const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {type:String, required:true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    summary: {type:String, required:true},
    category: {type:String, required:true},
    content: {type:String, required:true},
    commentCount: {type:Number, default:0},
    upvotes: {type:Number, default:0},
    downvotes: {type:Number, default:0},
    resolve: {type:Boolean, default:false}
},{
    timestamps:true
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = {PostModel};