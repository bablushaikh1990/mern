import blog from "../model/canadaBlog.js"
export const createBlog11 = async (req, res) => {
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
  export const createBlog = async (req, res) => {
    try {
      // Get user input
      const { title, description } = req.body;
      const image = req.file ? req.file.filename : null; // Ensure the image file is present
  
      // Validate user input
      if (!(title && description && image)) {
        return res.status(400).json({ message: 'Title, description, and image are required' });
      }
  
      // Create blog post in the database
      const newBlog = await blog.create({
        title: title,
        description: description,
        image: image,
      });
  
      // Return success or failure response
      if (newBlog) {
        return res.status(201).json({
          message: 'Blog created successfully',
          blog: newBlog,
        });
      } else {
        return res.status(500).json({ message: 'Something went wrong, please try again' });
      }
  
    } catch (err) {
      console.error('Error creating blog:', err);
      return res.status(500).json({ message: 'Server error, please try again later' });
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

export const getBlogById = async (req, res) => {
  const { id } = req.params;  // Destructure id directly from params
  console.log(`Fetching blog with id: ${id}`);

  try {
    // Attempt to find the blog by id
    const blogData = await blog.findById(id);

    // If blog data exists, respond with it; otherwise, return a 404 with a meaningful message
    if (blogData) {
      return res.status(200).json(blogData);  // Return early to avoid unnecessary nesting
    }

    // If no blog is found, return a 404 status with a clear message
    return res.status(404).json({ message: "Blog not found" });
  } catch (error) {
    // Log the error for debugging and send a clear error response
    console.error("Error fetching blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBlogById = async (req, res) => {
  const { id } = req.params;  // Destructure id directly from params
  console.log(`Deleting blog with id: ${id}`);

  try {
    // Attempt to find the blog by id and delete it
    const deletedBlog = await blog.findByIdAndDelete(id);

    // If the blog is found and deleted, return success response
    if (deletedBlog) {
      return res.status(200).json({ message: "Blog deleted successfully" });
    }

    // If no blog is found, return a 404 status with a clear message
    return res.status(404).json({ message: "Blog not found" });
  } catch (error) {
    // Log the error for debugging and send a clear error response
    console.error("Error deleting blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const editBlog = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    let updatedTeacher = req.body;

    // If an image is uploaded, add it to the updated data
    if (req.file) {
      updatedTeacher.image = req.file.filename;
    }

    // Perform the update
    const result = await blog.findByIdAndUpdate(
      { _id: id },
      updatedTeacher,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Return success response
    res.status(200).json({
      message: 'Blog updated successfully',
      updatedBlog: result
    });
    
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'An error occurred while updating the blog' });
  }
};

