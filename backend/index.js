const express = require("express");
const cors = require("cors");
const { UserModel, accessLevel } = require("./models/User.js");
const { PostModel} = require("./models/Post.js");
const { CommentModel } = require("./models/Comment.js");
const { VoteModel } = require("./models/Vote.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
    dotenv.config();
const {format} = require("date-fns");

try{
    console.log("Connecting to MongoDB Server");
    mongoose.connect(`mongodb+srv://root:${process.env.DB_PASSWORD}@cluster0.okymdr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("Connected to MongoDB Server");
}catch(e){
    console.log(e);
}



const app = express();
const port = 4000;
const saltRound = 11;
const salt = bcrypt.genSaltSync(saltRound);
const secretPrivateKey = process.env.PRIVATE_KEY;

// Defining Middlewares
app.use(cors({credentials:true,origin:"http://localhost:5173"}))
app.use(express.json());
app.use(cookieParser());
//
app.get("/profile", async (req, res)=>{
    const {token} = req.cookies;
    // Local Variable to store the user id, needed to verify if the user still exist in db
    let cookieInfo = {};
    if(token==null||token.length==0){
        res.status(401).json({message: "noToken"});
        return;
    }
    else{
        jwt.verify(token, secretPrivateKey, {}, (err,info)=>{
            if(err) throw err;
            cookieInfo = info;

        });
    }

    const userInfo = await UserModel.findById(cookieInfo.id);
    if(userInfo == null){
        res.status(401).json({message: "userNotExist"});
    }else{
        res.status(200).json(cookieInfo);
    }
    
    
});
// An api created specify only get the username from userId
app.get("/username/:userId", async (req, res)=>{
    const userId = req.params.userId;
    const username = await UserModel.findById(userId);

    // If username not found
    if(username == null || username == undefined){
        res.status(200).send("");
        return;
    }
    res.status(200).send(username.username);

});

app.post("/register", async (req,res)=>{
    const {username, password} = req.body;
    try{
        const userDoc = await UserModel.create(
            {
                username:username,
                password:bcrypt.hashSync(password, salt),
                accessLevel: accessLevel.USER
            }
        );

        res.status(200).json({message:"ok"});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"error"});
    }
});

app.post("/login", async (req, res)=>{
    const {username, password} = req.body;
    const userDoc = await UserModel.findOne({
        username: username
    });
    //Return 400 error if user does not exist in database
    if(userDoc==null){
        res.status(400).json({message:"User Not Found"});
        return;
    }
    if(username==null||password==null){
        res.status(400).json({message:"Empty username or password"});
        return;
    }
    //If password match, create token for session
    if(bcrypt.compareSync(password, userDoc.password)){
        jwt.sign({
            id: userDoc._id,
            username: userDoc.username,
            accessLevel: userDoc.accessLevel
        },
        secretPrivateKey, 
        {
        }, 
        (err, token)=>{
            if(err) throw err;
            res.status(200).cookie("token", token,
                {
                        httpOnly: true, // Prevents client-side JavaScript access
                        secure: true, // Secure=true in production (HTTPS required)
                        sameSite: "none", // Allows cookie in cross-origin requests
                        path: "/" // Ensures cookie is sent for all paths
                }
            ).json({message:"ok"});
            
        });
        
    }else{
        res.status(400).json({message:"wrong credentials"});
    }
});

app.post("/logout", (req, res)=>{
   res.status(200).clearCookie("token").json({message:"ok"}); 
});


app.get("/post", async (req, res)=>{
    // Bubble Sort an input list of posts in descending order
    function bubbleSortInvertDate(postlist, invert){
        for(let i = 0; i<postlist.length; i++){
            for(let j = 0; j<postlist.length-i-1; i++){
                let temp = postlist[j];
                if(postlist[j]["createdAt"]>postlist[j+1]["createdAt"]){
                    postlist[j] = postlist[j+1];
                    postlist[j+1] = temp;
                }
            }
        }
        if(invert){
            postlist = postlist.reverse();
        }
        return postlist;
    }
    function bubbleSortInvertVotes(postlist, invert){
        for(let i = 0; i<postlist.length; i++){
            for(let j = 0; j<postlist.length-i-1; i++){
                let temp = postlist[j];
                if((postlist[j]["upvotes"]-postlist[j]["downvotes"])>(postlist[j+1]["upvotes"]-postlist[j+1]["downvotes"])){
                    postlist[j] = postlist[j+1];
                    postlist[j+1] = temp;
                }
            }
        }
        if(invert){
            postlist = postlist.reverse();
        }
        return postlist;
    }
    function filterListByCategory(postlist, categoryName){
        return postlist.filter(item=>(item.category==categoryName));
    }
    function filterListByResolvedState(postlist, resolvedState){
        return postlist.filter(item=>(item.isResolved==resolvedState));
    }


    let posts = await PostModel.find().populate("userId", ['username']).sort({"createdAt":-1}).limit(20);
    if(posts.length==0){
        res.status(200).json({});
        return;
    }
    if(req.query.order!=null&&req.query.order!=""){
        if(req.query.order=="oldest"){
            posts = bubbleSortInvertDate(posts, false);
        }else if(req.query.order=="upvote"){
            posts = bubbleSortInvertVotes(posts, true);
        }else{
            posts = bubbleSortInvertVotes(posts, false);
        }
        
    }
    if(req.query.category!=null&&req.query.category!=""){
        posts = filterListByCategory(posts, req.query.category);
    }
    if(req.query.resolveState!=null&&req.query.resolveState!=""){
        if(req.query.resolveState=="resolved"){
            posts = filterListByResolvedState(posts, true);
        }else{
            posts = filterListByResolvedState(posts, false);
        }
        
    }
    // console.log(posts);
    res.status(200).json(posts);
});
app.post("/post", async (req, res)=>{
    const {title, summary, category, content} = req.body;
    const {token} = req.cookies;
    let userId = "";
    if(token==null||token.length==0){
        res.status(401).json({message: "noToken"});
    }
    else{
        jwt.verify(token, secretPrivateKey, {}, (err,info)=>{
        if(err) throw err;
        userId = info.id;
        });
    }
    try{
        const postDoc = await PostModel.create(
            {
                title: title,
                userId: userId,
                summary: summary,
                category: category,
                content: content
            }
        );
        res.status(200).json({postDoc});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"error"});
    }
});
// For post editing by the author only
app.put("/post", async (req, res)=>{
    const {title, summary, category, content, postId, isResolved} = req.body;
    const {token} = req.cookies;
    let userId = "";
    if(token==null||token.length==0){
        res.status(401).json({message: "noToken"});
        return;
    }
    else{
        jwt.verify(token, secretPrivateKey, {}, (err,info)=>{
        if(err) throw err;
            userId = info.id;
        });
    }
    try{
        const postDoc = await PostModel.findOneAndUpdate(
            {
                _id: postId
            },
            {
                title: title,
                summary: summary,
                userId: userId,
                category: category,
                content: content,
                isResolved: isResolved
            }
        );
        res.status(200).json({postDoc});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"error"});
    }
});
app.get("/post/vote/:postId", async (req, res)=>{
    const postId = req.params.postId;
    const {token} = req.cookies;
    let userId = "";
    if(token==null||token.length==0){
        res.status(401).json({message: "noToken"});
        return;
    }
    else{
        jwt.verify(token, secretPrivateKey, {}, (err,info)=>{
        if(err) throw err;
            userId = info.id;
        });
    }
    const voteDoc = await VoteModel.findOne({postId: postId, userId: userId});
    if(voteDoc==null||voteDoc==undefined){
        res.status(200).send("novote");
        return;
    }
    res.status(200).send(voteDoc.voteType);
});
app.put("/post/vote/:postId", async (req, res)=>{
    const postId = req.params.postId;
    let {userId, voteType} = req.body;
    const {token} = req.cookies;
    if(token==null||token.length==0){
        res.status(401).json({message: "noToken"});
        return;
    }
    // Check if vote is existed
    let voteDoc = await VoteModel.findOne({postId: postId, userId: userId});
    let postDoc = await PostModel.findById(postId);
    if(postDoc==null||postDoc==undefined){
        res.status(400).json({message: "post not found"});
        return;
    }
    
    if(voteDoc==undefined||voteDoc==null){
        voteDoc = await VoteModel.create({postId: postId, userId: userId, voteType: voteType});
        postDoc = await PostModel.findByIdAndUpdate(postId, {$inc:{[(voteType=="upvote")?"upvotes":"downvotes"]: 1}});
        res.status(200).send(voteDoc.voteType);
        return;
    }else{
        // The Existing Vote is found
        if(voteType=="noVote"){
            voteDoc = await VoteModel.findByIdAndDelete(voteDoc._id);
            postDoc = await PostModel.findByIdAndUpdate(postId, {$inc:{[(voteDoc.voteType=="upvote")?"upvotes":"downvotes"]: -1}});
            res.status(200).send("novote");;
            return;
        }else{
            voteDoc = await VoteModel.findByIdAndUpdate(voteDoc._id, {voteType: voteType});
            postDoc = await PostModel.findByIdAndUpdate(postId, {$inc:{[(voteType=="upvote")?"upvotes":"downvotes"]: 1}});
            postDoc = await PostModel.findByIdAndUpdate(postId, {$inc:{[(voteType=="upvote")?"downvotes":"upvotes"]: -1}});
            res.status(200).send(voteDoc.voteType);;
            return;
        }
        
        
    }
    
    
    res.status(200);
});
// Used to retreive the post information given the post id in the db
app.get("/post/:id", async (req, res)=>{
    const postInfo = await PostModel.findById(req.params.id).populate("userId", ['username']);
    const post = {
        id: postInfo._id,
        title: postInfo.title,
        username: postInfo.userId.username,
        category: postInfo.category,
        summary: postInfo.summary,
        content: postInfo.content,
        commentCount: postInfo.commentCount,
        upvotes: postInfo.upvotes,
        downvotes: postInfo.downvotes,
        createdAt: format(postInfo.createdAt,"Pp"),
        updatedAt: format(postInfo.updatedAt,"Pp"),
        isResolved: postInfo.isResolved
    }
    res.status(200).json(post);
});
// Used to retreive array of comments information given the post id in the db
app.get("/comment/:postId", async (req,res)=>{
    const postId = req.params.postId;
    let comments = await CommentModel.find({postId:postId});
    comments.forEach((value, index) => {
        comments[index] = {
            _id: value._id,
            postId: value.postId,
            userId: value.userId,
            content: value.content,
            createdAt: format(value.createdAt,"Pp"),
            updatedAt: format(value.updatedAt,"Pp")
        };
    }); 
    // The method below does not work as expectedly
    // Output: 6/13/2025, 4:06 PM 2025-06-13T08:06:56.747Z
    // comments.forEach((value, index) => {
    //     console.log(format(comments[index]["createdAt"],"Pp"));
    //     comments[index]["createdAt"] = format(comments[index]["createdAt"],"Pp");
    //     console.log(comments[index]["createdAt"]);
    //     comments[index]["updatedAt"] = format(value.updatedAt,"Pp");
            
    // }); 
    res.status(200).json(comments);
});
app.post("/comment", async (req,res)=>{
    const {postId, userId, content} = req.body;
    const {token} = req.cookies;
    if(token==null||token.length==0){
        res.status(401).json({message: "noToken"});
        return;
    }
    const commentDoc = await CommentModel.create(
        {
            postId: postId,
            userId: userId,
            content: content
        }
    );
    const postDoc = await PostModel.findByIdAndUpdate(postId, {$inc:{commentCount: 1}});
    res.status(200).json({message: "ok"});
});
app.delete("/comment/:commentId", async (req, res)=>{
    const commentInfo = await CommentModel.findById(req.params.commentId);
    const postId = commentInfo.postId;
    console.log(req.params.commentId);
    const commentDoc = await CommentModel.findByIdAndDelete(req.params.commentId);
    // Update the comment count
    const postDoc = await PostModel.findByIdAndUpdate(postId, {$inc:{commentCount: -1}});
    res.status(200).json({message: "ok"});

})
// Used to update user info requested by users
app.put("/changeProfileInfo/:userId", async (req, res)=>{
    const userId = req.params.userId;
    const userInfo = await UserModel.findByIdAndUpdate(userId, {username: req.body.username});
    res.status(200).clearCookie("token").json({message:"ok"}); 
});
app.delete("/deletePost/:postId", async (req, res)=>{
    try {
        const postDeletion = await PostModel.findByIdAndDelete(req.params.postId);
        await CommentModel.deleteMany({postId:{$in:req.params.postId}});
        
    } catch (error) {
        console.log(error);
        res.status(400);
    }
    
    res.status(200).json({message:"ok"});
});
app.delete("/deleteProfile/:userId", async (req, res)=>{
    try {
        // Retrieve a list of postList first
        const postList = await PostModel.find({userId: req.params.userId}).select("_id");
        // if(postList.length!=0){
        //     const deletedPostIdList = postList.map(info=>info._id);
        //     // $in operation is support in mongoseDB: https://www.mongodb.com/docs/manual/reference/operator/query/in/#mongodb-query-op.-in
        //     // const commentLinkingDeletion = await CommentModel.deleteMany({postId:{$in:deletedPostIdList}});
        //     const commentDeletion = await CommentModel.deleteMany({userId:req.params.userId});
        //     const postDeletion = await PostModel.deleteMany({userId: req.params.userId});
        // }

        // const userInfo = await UserModel.findByIdAndDelete(req.params.userId);

        // Delete all the votes made
        // Get all the relevant posts as list
        const votedVoteList = await VoteModel.find({userId: req.params.userId});
        // Map the voteList to be the list of postId and use it to get all the voted posts as list.
        const votedVotesId = votedVoteList.map((value)=>{return value.postId});
        // const votedPostList = await PostModel.find({_id: {$in:votedVoteList.map((value)=>{return value.postId})}});
        for(let i = 0; i<votedVoteList.length;i++){
            if(votedVoteList.at(i).voteType=="upvote"){
                await PostModel.findByIdAndUpdate(votedVotesId.at(i), {$inc: {upvotes: -1}});
            }else{
                await PostModel.findByIdAndUpdate(votedVotesId.at(i), {$inc: {downvotes: -1}});
            }
        }

        const deleteVotesDoc = await VoteModel.deleteMany({userId: req.params.userId});
    } catch (error) {
        res.status(400).clearCookie("token").json({message:"error"});
        console.log(error);
        return;
    }
    
    res.status(200).clearCookie("token").json({message:"ok"}); 
});

app.listen(port);