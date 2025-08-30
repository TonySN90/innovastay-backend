import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
      throw new Error('DATABASE and DATABASE_PASSWORD must be defined in your .env file');
    }
    const DB = process.env.DATABASE.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD,
    );

    await mongoose
        .connect(DB)
        .then((con) => console.log('DB connection successful!'))
        .catch((err) => console.log(err));
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};