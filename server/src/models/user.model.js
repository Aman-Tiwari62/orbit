// models/user.model.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:30
    },

    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:3,
        maxlength:20
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },

    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:128,
        select:false // hide password by default
    },

    bio:{
        type:String,
        trim:true,
        maxlength:150,
        default:""
    },

    profilePic:{
        type:String,
        default:""
    },

    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},
{
    timestamps:true
}
);

export const User = mongoose.model(
    "User",
    userSchema
);