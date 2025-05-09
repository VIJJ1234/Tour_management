import express from 'express';
import {
    createTour,
    updateTour,
    deleteTour,
    getSingleTour,
    getAllTour,
    getTourBySearch,
    getFeaturedTour,
    getTourCount,
} from '../controllers/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Define the routes
router.post('/',verifyAdmin,createTour); // Create
router.put('/:id',verifyAdmin, updateTour); // Update
router.delete('/:id',verifyAdmin, deleteTour); // Delete
router.get('/:id', getSingleTour); // Get single tour
router.get('/', getAllTour); // Get all tours
router.get('/search/getTourBySearch',getTourBySearch);// get tour by search
router.get('/search/getFeaturedTours',getFeaturedTour);// get tour by search
router.get('/search/getTourCount',getTourCount);

export default router;
