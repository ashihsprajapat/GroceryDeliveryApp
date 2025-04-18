

import mongoose, { Schema, model } from "mongoose";
import User from "./user.model.js";


const addressSchema = new Schema({
    // userId:{type:Schema.Types.ObjectId, ref:User, required:true}

    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: Number, required: true },
    country: { type: String, required: true },
    phone: { type: Number, required: true },

})


export const Address = model.Address || model("Address", addressSchema)