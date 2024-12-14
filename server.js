import express from "express";
import mongoose from "mongoose";
import rout from "./Route/user.js";
import cors from "cors";
import 'dotenv/config';


const app =express();
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((res) => console.log("Connected to the DB"))
  .catch((err) => console.log("error while connecting to db: ", err));
  
  app.use(express.json());
  console.log(process.env.PORT)
app.use(express.urlencoded({ extended: true }));
const corsOptions = { exposedHeaders: ["ak", "rk", "ft"] };
app.use(cors("http://localhost:3000/"));
// app.use(morgan("dev"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(rout)
const port = process.env.PORT || 8181;
app.listen(port,()=>{
    console.log("connection")
})