

import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from 'cookie-parser';
import { conntectToDb } from './config/Mongodb.js';
import userRoutes from './routes/user.routes.js'
import sellerRoutes from './routes/seller.routes.js'

dotenv.config();


const app = express();

const allowedOrigins = ["http://localhost:8088/"]

app.use(express.json())
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))
app.use(cookieParser())


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("App is listing on port", port)
})

await conntectToDb()
    .then(() => console.log("Connect to db"))

app.get("/", (req, res) => {
    res.send(" Api is working")
})

app.use("/api/user", userRoutes);


app.use("/api/seller", sellerRoutes);

