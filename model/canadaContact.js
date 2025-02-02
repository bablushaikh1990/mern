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
    address: {
        type: String
    },
    serviceType: {
        type: String
    },
    message: {
        type: String
    },
},
{
    timestamps:true
}
)
export default mongoose.model("canada_contact", userSchema)