
import express from 'express'
import { authUser } from '../middleware/authUser.middleware.js';
import { addAddress, getAddress } from '../controller/address.controller.js';
const addressRoutes = express.Router();


addressRoutes.route("/add-address")
    .post(authUser, addAddress)


addressRoutes.route("/get-address")
    .get(authUser, getAddress)


export default addressRoutes