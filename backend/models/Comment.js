const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    postId: {type:mongoose.Schema.Types.ObjectId, ref:"Post", required:true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    content: {type:String, required:true}
},{
    timestamps:true
});

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = {CommentModel};