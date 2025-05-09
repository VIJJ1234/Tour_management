import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    tourId: { // 🔄 changed from productId to tourId
      type: mongoose.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
