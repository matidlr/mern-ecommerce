import express from "express";
import {createUser, loginUser, logout, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById } from '../controllers/userController.js'

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post('/logout', logout);

router.route('/profile')
       .get(authenticate, getCurrentUserProfile)
       .put(authenticate, updateCurrentUserProfile);

router.route('/:id').delete(authenticate, authorizeAdmin, deleteUserById)

export default router;