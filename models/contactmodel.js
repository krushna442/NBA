import express from 'express';
import mongoose from 'mongoose';
const Contact_schema=new mongoose.Schema({
    name:{type:String, required:true},
    course:{type:String, required:true},
    location:{type:String,required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    message:{type:String, required:true}
    });
 const Contact= mongoose.model('Contact',Contact_schema);
 export default Contact;