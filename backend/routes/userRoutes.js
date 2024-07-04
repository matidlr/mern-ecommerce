import express from "express";
import {createUser, loginUser, logout} from '../controllers/userController.js'
const router = express.Router()

router.route('/').post(createUser);
router.post("/auth", loginUser);
router.post('/logout', logout);

export default router;