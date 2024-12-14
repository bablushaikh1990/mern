import express from "express";
import * as userController from "../Controllers/user.js"
const Route= express.Router();
Route.post("/test",userController.Addusers);
Route.get("/all-users",userController.AllUaers);
Route.delete("/data/:id",userController.UserDelete);
Route.patch("/edit/:id",userController.UserUpdate);
Route.get("/find/:id",userController.getUserById);
export default  Route;
