
import mongoose, { Schema, model } from "mongoose";
import User from "./user.model.js";
import Product from "./product.model.js";

const orderSchema = new Schema({
    userId: { type: String, requrired: true, ref: "User" },
    items: [{
        product: { type: String, required: true, ref: "Product" },
        quantity: { type: Number, required: true, },
    }],
    amount: { type: Number, required: true },
    address: { type: String, required: true, ref: 'Address' },
    status: { type: String, required: true, default: "Order Placed" },
    paymentType: { type: String, required: true },
    isPaid: { type: Boolean,required: true, default: false },

},{timestamps:true})

const Order = model.Order || model("Order", orderSchema)

export default Order