import dotenv from 'dotenv';
import app from "./app";
import { connectDB } from './src/config/database';

dotenv.config({ path: './config.env' });

connectDB();

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});