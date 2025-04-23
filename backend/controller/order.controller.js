import Order from "../model/order.model.js";
import Product from "../model/product.model.js";

//order place : /api/order/add
export const placeOrderCOD = async (req, res) => {
    try {

        if (!items.length == 0 || !address) {
            return res.json({ success: false, message: "All Dtails are required" })
        }

        //calculate amount of order

        let amount = await items.reduce(async (ActiveXObject, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        amount += Math.flor(amount * 0.02);

        const { userId, items, address, } = req.body;

        await Order.create({
            ...items, userId, amount, address,
            paymentType: "COD"
        })

        res.json({ success: true, message: "order placed" })
    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })
    }
}



//get orders by userId : /api/order/userId

export const getUserorder = async (req, res) => {
    const { userId } = req.body;

    try {
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate('items.product address').sort({ createAt: -1 })

        res.json({ success: true, orders })
    } catch (err) {
        console.log(e.message)
        res.json({ success: false, message: e.message })
    }
}



//get all orders : /api/order/seller

export const getAllOrder = async (req, res) => {

    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate('items.product address').sort({ createAt: -1 })

        res.json({ success: true, orders })
    } catch (err) {
        console.log(e.message)
        res.json({ success: false, message: e.message })
    }
}