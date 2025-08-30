import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURL = process.env.MONGO_URL || 'mongodb://root:example@localhost:27017/Innovastay-DB?authSource=admin';
    
    await mongoose.connect(mongoURL);
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};