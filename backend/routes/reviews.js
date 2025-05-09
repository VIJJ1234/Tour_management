import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { createReview } from './../controllers/reviewController.js';

const router =express.Router()

router.post('/:tourId',createReview )

export default router