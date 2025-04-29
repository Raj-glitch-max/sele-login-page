const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection URI from .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB connection failed', err);
    process.exit(1);  // Exit on failure
  }
};

// Call the connectDB function to establish the connection
connectDB();
