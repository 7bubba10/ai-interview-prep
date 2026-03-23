import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import interviewRoutes from './routes/interviewRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(cors());

// Auth Route
app.use('/api/auth', authRoutes);

// Interview Route
app.use('/api/interview', interviewRoutes);

// Index
app.get('/',(req:Request,res:Response) =>{
    res.json({message: 'API is running'});
});

// Listener
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });