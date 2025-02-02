import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  
    email: {
        type: String
    },
  
},
{
    timestamps:true
}
)
export default mongoose.model("canada_subscribe", userSchema)