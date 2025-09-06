
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const authUser = async (req, res, next) => {
    try {
        const { grocery_token } = req.cookies;

        res.send({success: true, message: "grocery_token", grocery_token})

        if (!grocery_token)
            return res.json({ success: false, message: "not Login" })



        const decode = jwt.verify(grocery_token, process.env.JWT_SECRET);

        const userId = decode.id

        let user = await User.findById(userId).select("-password")

        if (!decode.id || !user) {
            return res.json({ success: false, message: "not Authorize" })
        }


        req.userId = decode.id;
        req.user = user

        next();

    } catch (e) {
        console.log(e.message);
        return res.json({ success: false, message: e.message });
    }

}