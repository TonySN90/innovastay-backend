import dotenv from 'dotenv';
import createApp from "./app";
import { connectDB } from './src/config/database';

dotenv.config({ path: './config.env' });

const startServer = async () => {
  await connectDB();
  
  const app = await createApp();
  const PORT = process.env.PORT || 2000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Admin panel available at http://localhost:${PORT}/admin`);
  });
};

startServer().catch(console.error);