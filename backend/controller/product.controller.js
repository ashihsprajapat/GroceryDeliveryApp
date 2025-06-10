import { upload } from "../config/multer.js";

import Product from './../model/product.model.js';
import cloudinary from './../config/cloudinary.js';


//Add product : api/product/add
export const addProduct = async (req, res) => {
    try {
        console.log("req.boady  =", req.body)

        let productData = JSON.parse(req.body.productData)

        const images = req.files;
        console.log("images are", images)

        let imageUrl = []
        if (images && images.length > 0) {
            const uploadResults = await Promise.all(
                images.map((item) => cloudinary.uploader.upload(item.path, {
                    resource_type: 'image'
                }))
            );
            imageUrl = uploadResults.map(result => result.secure_url);
        }
        console.log("image urls arr", imageUrl)
        await Product.create({ ...productData, image: imageUrl });

        return res.json({ success: true, message: "product added" })

    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })
    }
}


//get product-list : api/product/list
export const productList = async (req, res) => {


    try {

        const products = await Product.find({})

        return res.json({ success: true, products })

    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })

    }
}


//Get single product : api/product/id
export const productById = async (req, res) => {

    try {
        const { id } = req.params

        const product = await Product.findById(id)

        return res.json({ success: true, product })

    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })

    }
}


//chnge stock : api/product/stock
export const changeStock = async (req, res) => {

    try {

        const { id, inStock } = req.body;

        await Product.findByIdAndUpdate(id, { inStock })

        return res.json({ success: true, message: "stack updated" })

    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })

    }
}