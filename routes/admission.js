import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";

const router = express.Router();

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));
// router.use(cors());

const admissionFormSchema =mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    dob:String,
    mobile:String,
    altNumber:String,
    address:String,
    pinCode:String,
    guardianRelation:String,
    guardianPhone:String,
    guardianNumber:String,
    guardianOccupation:String,
    tenthYear:String,
    tenthBoard:String,
    tenthStream:String,
    tenthMode:String,
    tenthPercentage:String,
    twelfthYear:String,
    twelfthBoard:String,
    twelfthStream:String,
    twelfthPercentage:String,
    graduationYear:String,
    graduationBoard:String,
    graduationStream:String,
    graduationPercentage:String,
    postGraduationYear:String,
    postGraduationBoard:String,
    postGraduationStream:String,
    postGraduationPercentage:String,
});
const AdmissionForm = mongoose.model("AdmissionForm", admissionFormSchema);
router.post("/admissionForm",async(req,res)=>{
    try {
        const formattedData = req.body;
        const admissionForm = new AdmissionForm(formattedData);

   await admissionForm.save()
    .then(data=>res.json(data))
    }
    catch (err) {
        console.log(err);
    }
})

export default router;