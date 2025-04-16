
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const authUser = async (req, res, next) => {
    try {
        const { grocery_token } = req.cookies;

        if (!grocery_token)
            return res.json({ success: false, message: "not Login" })


        const decode = jwt.verify(grocery_token, process.env.JWT_SECRET);

        if (!decode.id) {
            return res.json({ success: false, message: "not Authorize" })
        }


        req.userId = decode.id;

        next();

    } catch (e) {
        console.log(e.message);
        return res.json({ success: false, message: e.message });
    }

}