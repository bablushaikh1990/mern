import mongoose from "mongoose";
const Schema = mongoose.Schema;
var UserTypeSchema = mongoose.Schema({
    

        title: String,
        description:String,
        image:String,
        blogimage:String,
        
      
        created: { 
            type: Date,
            default: Date.now
        }
    },{
        collection: 'canada_blog'
    }
    );

export default  mongoose.model('canada_blog', UserTypeSchema)