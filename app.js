import express from "express";
import mongoose from "mongoose";
import rout from "./Route/user.js";
import cors from "cors";
import 'dotenv/config';

const app = express();

// Database connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the DB"))
  .catch((err) => console.log("Error while connecting to DB: ", err));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration to allow multiple origins
const allowedOrigins = [
  "http://3.6.143.160:3000",  // React app running on port 3000
  "http://3.6.143.160:3001",  // React app running on port 3001
 "http://ec2-3-6-143-160.ap-south-1.compute.amazonaws.com:3000",
 "http://ec2-3-6-143-160.ap-south-1.compute.amazonaws.com:3001",
 "http://localhost:3000",
 "http://localhost:3001",
];


const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowed origins list or if it's undefined (for development)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error("Not allowed by CORS"));  // Deny the request
    }
  },
  exposedHeaders: ["ak", "rk", "ft"],  // Expose specific headers to the client
};

app.use(cors(corsOptions));  // Apply CORS middleware to allow multiple React apps

// Static file serving for uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use(rout);

// Server setup
const port = process.env.PORT || 8181;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
