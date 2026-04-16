import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
    isConnected = true;
    console.log('MongoDB connected:', conn.connection.host);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};
