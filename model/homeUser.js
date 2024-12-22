import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
   
    message: {
        type: String
    },
})
export default mongoose.model("homeUser", userSchema)