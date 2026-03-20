import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import pool from './db';
import cors from 'cors';

const app = express();
const PORT : number = 8000;


app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

// Index
app.get('/',(req:Request,res:Response) =>{
    res.json({message: 'API is running'});
});

// Temporary Test Connection
/* pool.query('SELECT NOW()',(err,res) =>{
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Databse connection successful', res.rows[0]);
    }

})
 */

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });