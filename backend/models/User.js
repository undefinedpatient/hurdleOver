const mongoose = require("mongoose");

const accessLevel = {
    ADMIN: 0,
    USER: 1
};

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true, min:4, unique: true},
    password: {type:String, required:true, min:4},
    accessLevel: {type:Number , default:accessLevel.USER}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
    UserModel,
    accessLevel
};