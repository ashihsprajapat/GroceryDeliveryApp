
import express from 'express'
import { isAuth, login, logout, register } from '../controller/user.controller.js';
import { authUser } from '../middleware/authUser.middleware.js';
const Router = express.Router();

Router.route("/register")
.post(register);

Router.route("/login")
.post(login);


Router.route("/is-auth")
.post(authUser, isAuth);


Router.route("/logout")
.get(authUser, logout);

export default Router;