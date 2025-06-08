

import mongoose, { Schema, SchemaType, model } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true, },
    description: { type: String, required: true, },
    price: { type: Number, required: true, },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    inStack: { type: Boolean, default: true },
}, { timestamps: true })


const Product = model.Product || model('Product', productSchema);

export default Product;