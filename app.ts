import express, { Application } from 'express';
import cors from 'cors';
import { connectDB } from './src/config/database';
import testRoutes from './src/routes/test';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/test', testRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Innovastay Backend API' });
});

export default app;