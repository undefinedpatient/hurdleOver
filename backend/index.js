const express = require("express");
const cors = require("cors");
const { UserModel, accessLevel } = require("./models/User.js");
const { PostModel} = require("./models/Post.js");
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
app.get("/profile", (req, res)=>{
    const {token} = req.cookies;
    if(token==null||token.length==0){
        res.status(401).json({message: "noToken"});
    }
    else{
        jwt.verify(token, secretPrivateKey, {}, (err,info)=>{
        if(err) throw err;
        res.status(200).json(info);
        });
    }
    
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
    const posts = await PostModel.find().populate("author", ['username']).sort({"createdAt":-1}).limit(20);
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
                summary: summary,
                author: userId,
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

app.get("/post/:id", async (req, res)=>{
    const postInfo = await PostModel.findById(req.params.id).populate("author", ['username']);
    const post = {
        title: postInfo.title,
        author: postInfo.author.username,
        category: postInfo.category,
        content: postInfo.content,
        createdAt: format(postInfo.createdAt,"Pp"),
        updatedAt: format(postInfo.updatedAt,"Pp")
    }
    console.log(postInfo);
    console.log(post);
    res.status(200).json(post);
});
app.listen(port);