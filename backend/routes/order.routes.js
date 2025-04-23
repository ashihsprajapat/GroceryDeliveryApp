
import express from 'express'
import { authUser } from './../middleware/authUser.middleware.js';
import {  getAllOrder, getUserorder, placeOrderCOD } from '../controller/order.controller.js';
import { authSeller } from '../middleware/authSeller.middle.js';
const orderRoute= express.Router();


orderRoute.route("/COD")
.post( authUser, placeOrderCOD)


orderRoute.route("/user")
.get( authUser, getUserorder)

orderRoute.route("/seller")
.get( authSeller, getAllOrder)

export default orderRoute;