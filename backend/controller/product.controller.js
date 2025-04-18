import { upload } from "../config/multer.js";
import { v2 as cloudinary } from 'cloudinary'
import Product from './../model/product.model.js';


//Add product : api/product/add
export const addProduct = async (req, res) => {

    try {

        let productData = JSON.parse(req.body.productData);

        const images = req.files;

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.paht, { resource_type: 'image' })
                return result.secure_url
            })
        )

        await Product.create({ ...productData, image: imageUrl });

        return res.JSON({ success: true, message: "product added" })

    } catch (e) {
        console.log(e.message)
        res.JSON({ success: false, message: e.message })
    }
}


//get product-list : api/product/list
export const productList = async (req, res) => {


    try {

        const products = await Product.find({})

        return res.JSON({ success: true, products })

    } catch (e) {
        console.log(e.message)
        res.JSON({ success: false, message: e.message })

    }
}


//Get single product : api/product/id
export const prouctById = async (req, res) => {

    const { id } = req.params

    try {

        const product = await Product.findById(id)

        return res.JSON({ success: true, product })

    } catch (e) {
        console.log(e.message)
        res.JSON({ success: false, message: e.message })

    }
}


//chnge stock : api/product/stock
export const changeStock = async () => {

    try {
        const { id, inStock } = req.body;

        await Product.findByIdAndUpdate(id, inStock)

        return res.JSON({ success: true, message: "stack updated" })

    } catch (e) {
        console.log(e.message)
        res.JSON({ success: false, message: e.message })

    }
}