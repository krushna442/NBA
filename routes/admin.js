import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Contact from "../models/contactmodel.js";

const Testimonial = mongoose.model("Testimonial", {
  name: String,
  url: String,
});

const Blog =mongoose.model ("Blog",{
    blog:{type:String}
   })

// testimonial End point
router.post("/admin/testimonial", async (req, res) => {
  const { name, url } = req.body;
  try {
    await Testimonial.create({
      name: name,
      url: url,
    });
    res.status(201).json({ message: "testimonial created" });
  } catch {
    res.status(400).send({ message: "Invalid request" });
  }
});

router.get("/admin/showtestimonial", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    if (!testimonials || testimonials.length === 0) {
      return res.status(404).json({ error: "No testimonials found" });
    }

    const response = testimonials.map((testimonial) => {
      const videoId = extractYouTubeVideoId(testimonial.url);

      return {
        _id: testimonial._id,
        thumbnail: videoId
          ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
          : null,
        url: testimonial.url,
        name: testimonial.name,
      };
    });

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Function to extract YouTube video ID
function extractYouTubeVideoId(url) {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

//delete testimonial End point
router.delete("/admin/testimonial/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "testimonial not found" });
    }
    res.status(200).json({ message: "testimonial deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// vlog end point

router.post("/vlog/add", async (req, res) => {
  const { blog } = req.body;
  try {
    await Blog.create(
        {
            blog:blog
        }
    );
    res.status(201).json({ message: "Blog created" });
    } catch (err) {
        res.status(500).json({ message: err.message });
        }
});
// vlog end point
router.get('/vlog/show',(req,res)=>{
    Blog.find().then((blog)=>{
        res.json(blog)
        }).catch((err)=>{
            res.status(500).json({message:err.message})
            })
})
router.delete('/vlog/delete/:id',async(req,res)=>{
    try{
        const blog=await Blog.findByIdAndDelete(req.params.id)
        if(!blog){
             return res.status(404).message("not Found");

        }
        res.status(200).json({message:"blog deleted"})
        }catch(err){
            res.status(500).json({ message: err.message })    
    }
})


// contact page details 
router.get ('/contact',(req,res)=>{
     Contact. find().then((contact)=>{
        res.json(contact)
        }).catch((err)=>{
            res.status(500).json({message:err.message})
            })
            })

export default router;
