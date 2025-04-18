

import express from 'express'
import { authUser } from '../middleware/authUser.middleware.js'
import { updateCart } from '../controller/cart.controller.js'

const cartRoutes = express.Router()

cartRoutes.route("/update")
    .post(authUser, updateCart)


export default cartRoutes