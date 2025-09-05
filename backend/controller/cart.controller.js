

// update user cart data :  /api/cart/update

import User from "../model/user.model.js";

export const updateCart = async (req, res) => {
    try {

        const { cartItems } = req.body;
        const userId = req.userId;
        let length = Object.keys(cartItems).length

        if (length < 1) {
            return res.json({ success: false, message: "No items in your cart" })
        }

        await User.findByIdAndUpdate(userId, { cartItems });

        res.json({ success: true, message: 'cart updated' })

    } catch (e) {

        console.log(e.message)
        res.json({ success: false, message: e.message })

    }
}