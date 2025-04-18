

import express from 'express';
import { isSellerAuth } from '../controller/authSeller.controller.js';
import { addProduct, changeStock } from '../controller/product.controller.js';
import { upload } from '../config/multer.js';

const Router = express.Router();


Router.route("/add")
    .post(isSellerAuth, upload.array(["images"]), addProduct)

Router.route("/list")
    .get(addProduct)


Router.route("/:id")
    .get(addProduct)


Router.route("/stock")
    .post(isSellerAuth, changeStock)

export default Router