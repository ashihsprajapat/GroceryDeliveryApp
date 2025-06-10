

import express from 'express';
import { isSellerAuth } from '../controller/authSeller.controller.js';
import { addProduct, changeStock, productById, productList } from '../controller/product.controller.js';
import { upload } from '../config/multer.js';
import { authSeller } from '../middleware/authSeller.middle.js';

const Router = express.Router();


Router.route("/add")
    .post( authSeller, upload.array("images"), addProduct)

Router.route("/list")
    .get(productList)


Router.route("/:id")
    .get(productById)


    //stock update 
Router.route("/stock")
    .put(authSeller, changeStock)

export default Router