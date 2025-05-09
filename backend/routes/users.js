import express from "express";
import { deleteUser,
         getAllUser,
         getSingleUser, 
         updateUser 
} from '../controllers/userController.js';

import {verifyAdmin ,verifyUser} from "../utils/verifyToken.js";

const router = express.Router();

router.put('/:id',verifyUser, updateUser);         // Update user
router.delete('/:id',verifyUser,deleteUser);      // Delete user
router.get('/:id',verifyUser, getSingleUser);      // Get single user
router.get('/',verifyAdmin, getAllUser);            // Get all users

export default router;
