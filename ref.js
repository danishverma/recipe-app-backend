// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Import User model
import User from './models/User';

// Set up Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define route for user registration
app.post('/api/users/register', async (req, res) => {
  try {
    // Parse request body
    const { first_name, last_name, email, contact, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      first_name,
      last_name,
      email,
      contact,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Return error response
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// repository.js
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { UserModel } from './models/user' // Import your models
import { PostModel } from './models/post'

config()

const URL = process.env.DATABASE_URL

export const connectToDatabase = async () => {
    try {
        await connect(`${URL}`)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        throw error // Re-throwing the error for handling in upper layers
    }
}

export const createUser = async (userData) => {
    try {
        const user = await UserModel.create(userData)
        return user
    } catch (error) {
        console.error('Error creating user:', error)
        throw error
    }
}

export const createPost = async (postData) => {
    try {
        const post = await PostModel.create(postData)
        return post
    } catch (error) {
        console.error('Error creating post:', error)
        throw error
    }
}

// Other CRUD operations for users and posts can be similarly implemented

