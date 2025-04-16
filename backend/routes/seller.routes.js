
import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout } from '../controller/authSeller.controller.js';
import { authSeller } from '../middleware/authSeller.middle.js';
const Router= express.Router();


Router.route('/login')
.post(sellerLogin)


Router.route("/is-seller")
.get( authSeller, isSellerAuth)


Router.route("/logout")
.get( authSeller, sellerLogout);



export default Router;