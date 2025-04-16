
import mongoose, { Mongoose, Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    cartItems: { type: Object, default: {} }
}, { minimize: false })

const User = model("User", userSchema);// Mongoose.models.User ||
export default User;