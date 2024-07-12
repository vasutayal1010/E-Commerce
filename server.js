import express from "express";
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors';




dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/v1/auth', authRoutes)
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get('/',(req,res)=>{
    res.send("<h1>Thsi is E-Commerce Site</h1>");
});

const PORT =  8080;

app.listen(PORT,()=>{
    console.log(`Server Running Succesfully on port ${PORT}`.bgCyan.white);
})