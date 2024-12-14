import express from "express";
import mongoose from "mongoose";
import rout from "./Route/user.js";
import cors from "cors"

const app =express();
mongoose
  .connect("mongodb+srv://fahim:VlC1J930kCjLfaGx@cluster0.qjlbx0h.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((res) => console.log("Connected to the DB"))
  .catch((err) => console.log("error while connecting to db: ", err));
  
  app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = { exposedHeaders: ["ak", "rk", "ft"] };
app.use(cors("http://localhost:3000/"));
// app.use(morgan("dev"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(rout)
app.listen(8000,()=>{
    console.log("connection")
})