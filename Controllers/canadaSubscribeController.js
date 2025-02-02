import canadaSubscribe from "../model/canadaSubscribe.js"

  export const canadaSubscribeAdd= async (req, res) => {
    try {
        const { email } = req.body;
    
        // Create a new contact document
        const newContact = new canadaSubscribe({
      
          email,
         
        });
    
        // Save the document to the database
        const savedContact = await newContact.save();
    
        res.status(201).json({
          success: true,
          message: "Contact created successfully",
          data: savedContact,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to create contact",
          error: error.message,
        });
      }
     
  
  }
   export const UserDelete = async (req, res) => {
        const id = req.params.id
        try {
            const allData = await canadaSubscribe.deleteOne({ _id: id });
            if (allData) {
                return res.status(201).json("User deleted Successfully");
            }
            console.log(allData)
    
        } catch (error) {
            res.status(409).json({ message: error.message });
    
        }
    
    }
    export const Allsubscribe = async (req, res) => {
        try {
            const allData = await canadaSubscribe.find();
            if (allData) {
                //  res.json(allData)
                res.status(200).json(allData);
            }
            //  console.log(allData)
        } catch (error) {
            res.status(404).json({ message: error.message })
    
        }
    
    }