import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import userRoutes from './routes/user.route.js';
import { isAuthenticated } from './middlewares/authentication.js';
dotenv.config();

const app = express();
app.use(cookieParser());

connectDB();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true
}));
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/post', isAuthenticated, postRoutes);
app.use('/api/user', isAuthenticated, userRoutes);
app.get('/api', (req,res)=>{
    res.status(200).json({
        status:"success",
        message:`server running on port ${port}`
    });
})


app.listen(port, ()=>{
    console.log(`server listening on port ${port}.`);
})