import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import testimonialRoutes from './routes/admin.js';
import contactUsRoute from './routes/contact.js';
import franchise_enquireRoute from './routes/franchise_enquire.js';
import admissionRoute from './routes/admission.js';


const app = express();
const PORT =3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const uri = "mongodb+srv://krushnch442:Krushna72@cluster0.d1dmm.mongodb.net/krushna?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then(() => console.log("Connected to database"))
    .catch(err => console.error("Database connection error:", err));

// API Routes
app.use('/api', testimonialRoutes);
app.use('/api',contactUsRoute);
app.use('/api',franchise_enquireRoute);
app.use('/api',admissionRoute);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
