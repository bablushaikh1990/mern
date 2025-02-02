import express from "express";
import multer from "multer";
import path from "path";
import * as userController from "../Controllers/user.js"
import * as blogController from "../Controllers/blog.js"
import * as adminController from "../Controllers/admin.js"
import  * as middleware from "../middlewares/auth.js"
import  *  as canadaContactController from "../Controllers/canadaContactController.js";
import * as  canadaSubscribeController from "../Controllers/canadaSubscribeController.js";
import * as  canadaBlogController from "../Controllers/canadaBlogController.js";

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

// ----CANADA---
Route.post("/canada-contact",canadaContactController.CanadaContactAdd);
Route.post("/subscribe",canadaSubscribeController.canadaSubscribeAdd);

Route.get("/canada-all-subscribe", middleware.validateAuthKey,canadaSubscribeController.Allsubscribe);
Route.delete("/canada-subscribe/:id",canadaSubscribeController.UserDelete);

Route.get("/canada-service", middleware.validateAuthKey,canadaContactController.AllUaers);
Route.delete("/canada-service-delete/:id",canadaContactController.UserDelete);

Route.post("/canada-blog",middleware.validateAuthKey,upload.single("blogimage"),canadaBlogController.createBlog);
Route.get("/canada-all-blog1",middleware.validateAuthKey,canadaBlogController.AllBlog);
Route.get("/canada-all-blog",canadaBlogController.AllBlog);
Route.get("/canada-one-blog/:id",canadaBlogController.getBlogById);
Route.delete('/canada-blog/:id', canadaBlogController.deleteBlogById);
Route.patch("/canada-blog-update/:id",
  upload.single("blogimage"),
  canadaBlogController.editBlog
);


Route.get("/all-users",userController.AllUaers);
Route.delete("/data/:id",userController.UserDelete);
Route.patch("/edit/:id",userController.UserUpdate);
Route.get("/find/:id",userController.getUserById);
export default  Route;
