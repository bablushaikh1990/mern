import express from "express";
import multer from "multer";
import path from "path";
import * as userController from "../Controllers/user.js"
import * as blogController from "../Controllers/blog.js"
import * as adminController from "../Controllers/admin.js"
import  * as middleware from "../middlewares/auth.js"

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
Route.get("/service", middleware.validateAuthKey,userController.AllUaers);
Route.delete("/service-delete/:id",userController.UserDelete);


Route.post("/contact-home",userController.AddHomeUser);
Route.get("/all-home-contact",middleware.validateAuthKey,userController.AllUaersContact);
Route.delete("/contact-delete/:id",userController.UserDeleteContact);
// =====Blog Route====
Route.post("/blog",middleware.validateAuthKey,upload.single("blogimage"),blogController.createBlog);
Route.get("/all-blog1",middleware.validateAuthKey,blogController.AllBlog);
Route.get("/all-blog",blogController.AllBlog);
Route.get("/one-blog/:id",blogController.getBlogById);
Route.delete('/blog/:id', blogController.deleteBlogById);
Route.patch("/blog-update/:id",
  upload.single("blogimage"),
  blogController.editBlog
);
// =====admin=======
Route.post("/register",adminController.registerUser);
Route.post("/login",adminController.loginUser);

Route.get("/all-users",userController.AllUaers);
Route.delete("/data/:id",userController.UserDelete);
Route.patch("/edit/:id",userController.UserUpdate);
Route.get("/find/:id",userController.getUserById);
export default  Route;
