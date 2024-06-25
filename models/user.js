const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:"string",
        required:"true"
    },
    email:{
        type:"string",
        required:"true",
        unique:"true"
    },
    password:{
        type:"string",
        required:"true",
        
    },
    role:{
        type:"string",
        required:"true",
        default:"NORMAL"
    }
},{timestamps:true})


const User = mongoose.model("User",userSchema);

module.exports = User;