

// update user cart data :  /api/cart/update

import User from "../model/user.model.js";

export const updateCart = async (req, res) => {
    try {

        const { userId, cartItems } = req.body;

        await User.findByIdAndUpdate(userId, { cartItems });


        res.json({ success: true, message: 'cart updated' })

    } catch (e) {

        console.log(e.message)
        res.json({ success: false, message: e.message })

    }
}