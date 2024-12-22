import blog from "../model/blog.js"
export const createBlog = async (req, res) => {
    //   const { id } = req.user;
                        
  try {
      // Get user input
  
      const { title, description,image} = req.body;
     // console.log(req.body._id +"hhhhhhhhhhhh");
  
      // Validate user input
      if (!(title && description)) {
       
      }
      // const userExist = await Cart.findOne({productid:_id});
      // if (userExist) {
      //   console.log("exits")
      //  // res.status(400).json({message:"exits"});
      // }else{
  
        // Create user in our database
      const user = await blog.create({
        title: title,
        description: description,
        image:req.file.filename ,
       
      });
      if(user){
      return res.json(user)
      }else{
        return res.json({message:"Somthing Worng"})
      }
      
    } catch (err) {
      console.log(err);
    }                      
    
  };

  export const AllBlog = async (req, res) => {
    try {
        const allData = await blog.find();
        if (allData) {
            //  res.json(allData)
            res.status(200).json(allData);
        }
        //  console.log(allData)
    } catch (error) {
        res.status(404).json({ message: error.message })

    }

}