// import tours from '../../frontend/src/assets/data/tours.js';
import Tour from '../models/Tour.js'

// Create a new tour
export const createTour = async (req, res) => {
    try {
      let result;
  
      if (Array.isArray(req.body)) {
        result = await Tour.insertMany(req.body);
      } else {
        const newTour = new Tour(req.body);
        result = await newTour.save();
      }
  
      res.status(200).json({
        success: true,
        message: 'Successfully created',
        data: result
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Failed to create. Try again'
      });
    }
  };
  


// Update an existing tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true });

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedTour,  // Corrected variable name to updatedTour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update"
        });
    }
};

// Delete a tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTour = await Tour.findByIdAndDelete(id);
        if (!deletedTour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Successfully deleted",
            data: deletedTour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete. Try again"
        });
    }
};

// Get a single tour by ID
export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate('reviews');
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Tour found",
            data: tour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tour. Try again"
        });
    }
};

// Get all tours
export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page); // fixed

    
    console.log(page);
    try {
        const tours = await Tour.find({}).populate('reviews')
        .skip(page * 8)
        .limit(8);

      res.status(200).json({
            success: true,
            message: "Tours retrieved successfully",
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tours. Try again"
        });
    }
};

// get tour by search
export const getTourBySearch = async (req, res) => {
  try {
    const city = new RegExp(req.query.city?.trim(), 'i');
    const distance = parseInt(req.query.distance?.trim());
    const maxGroupSize = parseInt(req.query.maxGroupSize?.trim());

  // Optional: console logs for debug
  console.log("Parsed distance:", distance);
  console.log("Parsed maxGroupSize:", maxGroupSize);


    // Validate numeric fields
    if (isNaN(distance) || isNaN(maxGroupSize)) {
      return res.status(400).json({
        success: false,
        message: "Invalid distance or maxGroupSize. Both must be numbers.",
      });
    }

    const tours = await Tour.find({
      city,
      distance: { $lte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate('reviews');

    res.status(200).json({
      success: true,
      message: "Successful search",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to search",
      error: err.message,
    });
  }
};

  
 // Get featured tours
export const getFeaturedTour = async (req, res) => {
    try {
      const featuredTours = await Tour.find({ featured: true }).populate('reviews').limit(8);
  
      res.status(200).json({
        success: true,
        message: "Successfully",
        data: featuredTours, // ✅ use the correct variable
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve featured tours. Try again",
      });
    }
  };

  //get tour counts
  // Get total count of tours
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount(); // Fast for counting total docs

    res.status(200).json({
      success: true,
      data: tourCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to count tours. Try again.",
    });
  }
};

  
