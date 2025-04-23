

// add adderss  : /api/address/add

import { Address } from "../model/address.model.js";

export const addAddress = async (req, res) => {
    try {
        const { userId, address } = req.body;

        const adddress = await Address.create({ ...address, userId });

        console.log(address)

        res.json({ success: true, message: "address add" })

    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })

    }
}


//get address :/api/address/get
export const getAddress = async (req, res) => {
    try {
        const { userId } = req.body;

        const address = await Address.find({ userId });
        res.json({ success: true, address })

    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })

    }
}