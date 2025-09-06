

// add adderss  : /api/address/add

import { Address } from "../model/address.model.js";

export const addAddress = async (req, res) => {
    try {
        let { address } = req.body;
        let userId = req.userId;


        if (!userId)
            return res.json({ success: false, message: "userId is requiredx" })

        address.email = req.user.email;

        address = await Address.create({ ...address, userId });

        res.json({ success: true, message: "address add", address })

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })

    }
}


//get address :/api/address/get
export const getAddress = async (req, res) => {
    try {
        const { userId } = req
        
        const address = await Address.find({ userId });

        res.json({ success: true, address })

    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })

    }
}