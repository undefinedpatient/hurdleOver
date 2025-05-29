const express = require("express");
const cors = require("cors");
const UserModel = require("./models/User.js")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRound = 11;
const salt = bcrypt.genSaltSync(saltRound);

try{
    console.log("Connecting to MongoDB Server");
    
    console.log("Connected to MongoDB Server");
}catch(e){
    console.log(e);
}

const app = express();
const port = 4000;

// Defining Middlewares
app.use(cors())
app.use(express.json());
//

app.post("/register", async (req,res)=>{
    const {username, password} = req.body;
    try{
        const userDoc = await UserModel.create(
            {
                username,
                password:bcrypt.hashSync(password, salt)
            });

        res.status(200).json({message:"ok"});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"error"});
    }
})

app.post("/login", async (req, res)=>{
    const {username, password} = req.body;
    const userDoc = await UserModel.findOne({
        username: username
    });
    if(bcrypt.compareSync(password, userDoc.password)){
        res.status(200).send(JSON.stringify(userDoc));
    }else{
        res.status(400).send(JSON.stringify(userDoc));
    }
});

app.listen(port);