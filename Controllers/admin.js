import bcrypt from 'bcryptjs';
import admin from '../model/admin.js'; // Assuming this is your user model
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the email is already registered
    const existingUser = await admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = new admin({
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
    try {
      // Destructure email and password from the request body
      const { email, password } = req.body;
  
      // Validate input fields
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Check if the email exists
      const existingUser = await admin.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: existingUser._id, email: existingUser.email },
        process.env.ACCESS_TOKEN_SECRET,  // Secret key (store in environment variables)
         // Token expiration time (1 hour)
      );
  
      // Send the token in the response
      return res.status(200).json({
        message: 'Login successful',
        token, // Send the JWT token
      });
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
