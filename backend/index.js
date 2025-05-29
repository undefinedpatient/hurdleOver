const express = require("express");
const cors = require("cors");
const UserModel = require("./models/User.js")
const mongoose = require("mongoose");

try{
    console.log("Connecting to MongoDB Server");
    mongoose.connect("mongodb+srv://root:PGohVix4ggeVKISf@cluster0.okymdr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
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
        const userDoc = await UserModel.create({username,password});
        res.send("ok").status(200);
    }catch(e){
        res.status(400).json(e);
    }
    
})
app.post("/login", (req, res)=>{
    const {username, password} = req.body;
    res.send("ok").status(200);
});

app.listen(port);