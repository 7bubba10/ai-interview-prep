import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();
const PORT : number = 8000;

app.use(express.json());
app.use(cors());

app.get('/',(req:Request,res:Response) =>{
    res.json({message: 'API is running'});
})


app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });