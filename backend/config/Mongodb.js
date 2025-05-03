
import mongoose from "mongoose";

export const conntectToDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/GroceryApp`)

    } catch (e) {
        console.log("---------------error occur---------------")
        console.log(e)
    }
}

