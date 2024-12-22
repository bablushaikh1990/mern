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
    service: {
        type: String
    },
    message: {
        type: String
    },
})
export default mongoose.model("user", userSchema)