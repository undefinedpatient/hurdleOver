const express = require("express");
const cors = require("cors");
const UserModel = require("./models/User.js")
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://root:lcwgTDvJIBKZ4mgT@cluster0.okymdr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


const app = express();
const port = 4000;

// Defining Middlewares
app.use(cors())
app.use(express.json());
app.post("/register", (req,res)=>{
    const {username, password} = req.body;
    res.send("ok").status(200);
})
app.post("/login", (req, res)=>{
    const {username, password} = req.body;
    res.send("ok").status(200);
});

app.listen(port);