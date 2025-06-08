
import User from "../model/user.model.js";
import bcrypt from 'bcrypt'
import { generatorUserToken } from './../utils/tokenGenerate.js';



export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password)
            return res.json({ success: false, message: "Missing details" })

        const user = await User.findOne({ email });
        if (user)
            return res.json({ success: false, message: "Email already exist" })

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();

        const token = generatorUserToken(newUser._id);

        res.cookie("grocery_token", token, {
            httpOnly: true,  //prevent javascript to access cookie
            secure: process.env.NODE_ENV === "developement",  // use secire cookie in production
            sameSite: process.env.NODE_ENV === "developement" ? 'none' : "stict",  //secur   CSRF protextion
            maxAge: 7 * 24 * 60 * 60 * 1000, //mili second cookie expiration time
        })

        return res.json({ success: true, message: "User rgister success", user: { email: newUser.email, name: newUser.name } })

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }
}


// login user function 
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res.json({ success: false, message: "Missing details" })

        const user = await User.findOne({ email })
        
        if (!user)
            return res.json({ success: false, message: "Email Not exist" })

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.json({ success: false, message: "Wrong password " })

        const token = generatorUserToken(user._id);

        res.cookie("grocery_token", token, {
            httpOnly: true,  //prevent javascript to access cookie
            secure: process.env.NODE_ENV === "developement",  // use secire cookie in production
            sameSite: process.env.NODE_ENV === "developement" ? 'none' : "stict",  //secur   CSRF protextion
            maxAge: 7 * 24 * 60 * 60 * 1000, //mili second cookie expiration time
        })

        return res.json({ success: true, message: "Login successfull", user: { email: user.email, name: user.name } })


    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }
}

// check auth : /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const { userId } = req;
        
        const user = await User.findById(userId).select('-password')
        
        if (!user)
            return res.json({ success: false, message: "Not authorize" })

        return res.json({ success: true, message: "authize user", user })

    } catch (e) {
        console.log(e)
        return res.json({ success: false, message: e.message })
    }

}

//logout user : /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("grocery_token", {

            httpOnly: true,
            secure: process.env.NODE_ENV === "developement",
            sameSite: process.env.NODE_ENV === "developement" ? 'none' : "stict",
        })

        return res.json({ success: true, message: "logout success full" })

    } catch (e) {
        console.log(e)
        return res.json({ success: false, message: e.message })
    }

}