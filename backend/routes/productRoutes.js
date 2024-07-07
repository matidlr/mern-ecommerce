import express from "express";
import formidable from 'express-formidable';
const router = express.Router()

import { addProduct, updateProductDetails, removeProduct, fetchProducts, fetchProductById, fetchAllProducts } from "../controllers/productController.js";
import {authenticate, authorizeAdmin} from '../middlewares/authMiddleware.js'
import checkId from "../middlewares/checkid.js";

router.route('/')
           .get(fetchProducts)
           .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route('/allproducts').get(fetchAllProducts)

router.route('/:id')
         .get(fetchProductById)
         .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
         .delete(authenticate, authorizeAdmin, removeProduct)

export default router;