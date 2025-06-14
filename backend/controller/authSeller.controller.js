import { generateSellerToken } from "../utils/tokenGenerate.js";


//login seller : /api/seller/login
export const sellerLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.json({ success: false, message: "All Details are required" })

        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
            const token = generateSellerToken(email);

            res.cookie("seller_token", token, {
                httpOnly: true,
                secure: process.env.MODE_DEV === "developement",
                sameSite: process.env.MODE_DEV === "developement" ? 'none' : "stict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })

            return res.json({ success: true, message: " Seller login Success" })
        } else {
            return res.json({ success: false, message: "wrong password and email" })
        }



    } catch (e) {
        console.log(e)
        return res.json({ success: false, message: e.message })
    }
}


//seller auth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true, message: "authorize Seller" })
    } catch (e) {
        console.log(e)
        return res.json({ success: false, message: e.message })
    }

}

//logout seller : /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("seller_token", {

            httpOnly: true,
            secure: process.env.NODE_ENV === "developement",
            sameSite: process.env.NODE_ENV === "developement" ? 'none' : "stict",
        })

        return res.json({ success: true, message: " Seller logout success " })

    } catch (e) {
        console.log(e)
        return res.json({ success: false, message: e.message })
    }

}

