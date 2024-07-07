import express from "express";
import formidable from 'express-formidable';
const router = express.Router()

import { addProduct } from "../controllers/productController.js";
import {authenticate, authorizeAdmin} from '../middlewares/authMiddleware.js'
import checkId from "../middlewares/checkid.js";

router.route('/').post(authenticate, authorizeAdmin, formidable(), addProduct);

export default router;