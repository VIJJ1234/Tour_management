import Tour from '../models/Tour.js';
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const { tourId } = req.params; // Extract tourId from URL params
  const { username, reviewText, rating } = req.body; // Extract review data from request body

  // Step 1: Validation - Ensure all required fields are present
  if (!username || !reviewText || !rating) {
    return res.status(400).json({
      success: false,
      message: "All fields are required (username, reviewText, rating).",
    });
  }

  // Step 2: Create the new review
  const newReview = new Review({
    username,
    reviewText,
    rating,
    tourId,
    createdAt: new Date(),
  });

  try {
    // Step 3: Save the review to the database
    const savedReview = await newReview.save();

    // Step 4: Add the saved review's ID to the corresponding tour's reviews array
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    // Step 5: Respond with success
    res.status(200).json({
      success: true,
      message: "Review created successfully",
    });
  } catch (err) {
    console.error("Review creation error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create review. Try again.",
    });
  }
};
