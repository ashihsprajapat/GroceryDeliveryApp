

import express from 'express';
import { isSellerAuth } from '../controller/authSeller.controller.js';
import { addProduct, changeStock, productById, productList } from '../controller/product.controller.js';
import { upload } from '../config/multer.js';
import { authSeller } from '../middleware/authSeller.middle.js';

const Router = express.Router();


Router.route("/add")
    .post(authSeller,(req,res, next)=>{console.log("req fils is",req), next()}, upload.array(["images"]), addProduct)

Router.route("/list")
    .get(productList)


Router.route("/:id")
    .get(productById)


    //stock update 
Router.route("/stock")
    .post(isSellerAuth, changeStock)

export default Router