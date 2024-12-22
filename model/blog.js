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
        collection: 'blog'
    }
    );

export default  mongoose.model('blog', UserTypeSchema)