const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    voteType: { type: String, enum: ['upvote', 'downvote'], required: true },
});

const VoteModel = mongoose.model("Vote", VoteSchema);

module.exports = {VoteModel};