import Order from "../model/order.model.js";
import Product from "../model/product.model.js";
import stripe from "stripe";

//order place : /api/order/add
export const placeOrderCOD = async (req, res) => {
    try {

        const { userId, items, address, } = req.body;

        // console.log(items, address, userId)

        if (items.length === 0 || !address) {
            return res.json({ success: false, message: "All Dtails are required" })
        }

        //calculate amount of order

        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            amount += product.offerPrice * item.quantity;
        }

        // Add 2% service charge
        amount += Math.floor(amount * 0.02);



        await Order.create({
            items, userId, amount, address,
            paymentType: "COD"
        })

        res.json({ success: true, message: "order placed" })
    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })
    }
}



//order place stripe : /api/order/stipe
export const placeOrderStripe = async (req, res) => {
    try {

        const { userId, items, address, } = req.body;

        const { origin } = req.headers;



        if (items.length === 0 || !address) {
            return res.json({ success: false, message: "All Dtails are required" })
        }

        let productData = []

        //calculate amount of order

        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: product.quantity,
            })
            amount += product.offerPrice * item.quantity;
        }

        // Add 2% service charge
        amount += Math.floor(amount * 0.02);



        let order = await Order.create({
            items, userId, amount, address,
            paymentType: "Online"
        })

        // stripe getway initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        // creat line items for sttripe
        const lineItems = productData.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
            },
            quantity: item.quantity,
        }));


        const seesion = await stripeInstance.checkout.sessions.create({
            line_items:lineItems,
            mode: "payment",
            success_url: `origin/loader?next=my-orders`,
            cancel_url: `origin/cart`,
            metadata: {
                orderId: order.id.toString(),
                userId,
            }
        })

        res.json({ success: true, message: "order placed", url: seesion.url })
    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })
    }
}


//get orders by userId : /api/order/userId

export const getUserorder = async (req, res) => {
    const { userId } = req;

    try {
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate('items.product address').sort({ createAt: -1 })

        res.json({ success: true, orders: orders.reverse() })
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