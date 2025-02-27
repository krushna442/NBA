import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Contact from '../models/contactmodel.js';
const router = express.Router();


// const uri ="mongodb+srv://krushnch442:Krushna72@cluster0.d1dmm.mongodb.net/krushna?retryWrites=true&w=majority";
//  router.use(express.json());
//  router.use(express.urlencoded({ extended: true }));
//  router.use(cors());
 



 router.post("/Contact",async(req,res)=>{
    const {name,course,location,email,phone,message}=req.body;
  try{ 
   await Contact.create({
        name:name,
        course:course,
        location:location,
        email:email,
        phone:phone,
        message:message
    })

res.status(201).send("created")
} catch (error) {
    res.status(400).send(error.message);
    }
 })

export default router;