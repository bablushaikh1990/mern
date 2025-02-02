import canadaContact from "../model/canadaContact.js"

  export const CanadaContactAdd = async (req, res) => {
    try {
        const { name, email, phone, service, address, serviceType, message } = req.body;

        console.log(req.body)
    
        // Create a new contact document
        const newContact = new canadaContact({
          name,
          email,
          phone,
          service,
          address,
          serviceType,
          message,
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
  export const AllUaers = async (req, res) => {
      try {
          const allData = await canadaContact.find();
          if (allData) {
              //  res.json(allData)
              res.status(200).json(allData);
          }
          //  console.log(allData)
      } catch (error) {
          res.status(404).json({ message: error.message })
  
      }
  
  }
  
  
  export const UserDelete = async (req, res) => {
      const id = req.params.id
      try {
          const allData = await canadaContact.deleteOne({ _id: id });
          if (allData) {
              return res.status(201).json("User deleted Successfully");
          }
          console.log(allData)
  
      } catch (error) {
          res.status(409).json({ message: error.message });
  
      }
  
  }
  
  
  export const UserUpdate = async (req, res) => {
      const id = req.params.id
      try {
        canadaContact.findByIdAndUpdate({ _id: id }, req.body)
              .then((data) => {
                  res.json({ message: "data update success fully" })
              })
  
  
      } catch (error) {
          res.status(409).json({ message: error.message });
  
      }
  
  }
  
  export const getUserById = async (req, res) => {
      const id = req.params.id
      console.log(id)
      try {
          const userData12 = await canadaContact.findById({ _id: id });
          res.status(200).json(userData12);
          console.log(userData12)
      } catch (error) {
          res.status(404).json({ message: error.message })
      }
  }