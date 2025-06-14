

import express from 'express';

import dotenv from 'dotenv';

import cors from "cors"

import cookieParser from 'cookie-parser';

import { conntectToDb } from './config/Mongodb.js';

import userRoutes from './routes/user.routes.js'

import sellerRoutes from './routes/seller.routes.js'

import productRoutes from './routes/product.route.js'

import cartRoutes from './routes/cart.route.js';

import addressRoutes from './routes/address.route.js';

import orderRoute from './routes/order.routes.js';

dotenv.config();


const app = express();

const allowedOrigins = ["http://localhost:5173"]

app.use(express.json())
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))
app.use(cookieParser())


if (process.env.MODE_DEV !== "production") {
    const port = process.env.PORT || 4000;

    app.listen(port, () => {
        console.log("App is listing on port", port)
    })
}
await conntectToDb()
    .then(() => console.log("Connect to db"))


app.get("/", (req, res) => {
    res.send(" Api is working")
})

app.use("/api/user", userRoutes);


app.use("/api/seller", sellerRoutes);

app.use("/api/product", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/address", addressRoutes);

app.use("/api/order", orderRoute);

