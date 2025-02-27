import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import testimonialRoutes from './routes/admin.js';
import contactUsRoute from './routes/contact.js';
import franchise_enquireRoute from './routes/franchise_enquire.js';
import admissionRoute from './routes/admission.js';


const app = express();
const PORT =3000;


const allowedOrigins = ["http://localhost:5173","https://vendormp.netlify.app","http://localhost:5174"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

  
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// MongoDB Connection
const uri = process.env.URI;
mongoose.connect(uri)
.then(() => console.log("Connected to database"))
    .catch(err => console.error("Database connection error:", err));
    // Routes
app.use('/api', testimonialRoutes);
app.use('/api',contactUsRoute);
app.use('/api',franchise_enquireRoute);
app.use('/api',admissionRoute);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
