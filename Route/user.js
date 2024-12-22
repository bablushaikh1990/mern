import express from "express";
import multer from "multer";
import path from "path";
import * as userController from "../Controllers/user.js"
import * as blogController from "../Controllers/blog.js"

const Route= express.Router();
let storage = multer.diskStorage({
    destination: "./uploads",
  
    filename: function (req, file, cb) {
      console.log("file");
      cb(
        null,
        file.originalname.replace(path.extname(file.originalname), " ") +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
    // filename: (req, file, cb) => {
    //     const fileName = file.originalname.toLowerCase().split(' ').join('-');
    //     cb(null, fileName)
    //   }
  });
  
  let upload = multer({ storage: storage });
Route.post("/contact",userController.Addusers);
Route.post("/contact-home",userController.AddHomeUser);
// =====Blog Route====
Route.post("/blog",upload.single("blogimage"),blogController.createBlog);
Route.get("/all-blog",blogController.AllBlog);

Route.get("/all-users",userController.AllUaers);
Route.delete("/data/:id",userController.UserDelete);
Route.patch("/edit/:id",userController.UserUpdate);
Route.get("/find/:id",userController.getUserById);
export default  Route;
