
import jwt from 'jsonwebtoken';


export const authSeller = async (req, res, next) => {
    try {
        const { seller_token } = req.cookies;
        if (!seller_token)
            return res.json({ success: false, message: "not autherize" })

        const decode = jwt.verify(seller_token, process.env.JWT_SECRET);
      

        if (decode.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return res.json({ success: false, message: "not autherize" })

        }


        //req.body.sellerEmail = decode.email;


    } catch (e) {
        console.log(e)
        return res.json({ success: false, message: e.message })
    }
}