import Booking from "../models/Booking.js";


// create bookings
export const createBooking=async(req, res)=>{
    const newBooking = new Booking(req.body)
    try{
        const savedBooking = await newBooking.save()
        res.status(201).json({success:true, message:'your tour is booked',data:savedBooking})
    }catch(err){
        res.status(400).json({success:false, message:'error booking tour'})
    }
};

// Get all bookings (admin only)
export const getAllBooking = async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.status(200).json({ success: true,message:"successful", data: bookings });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
    }
  };

  // Get bookings for a specific user (user only)
export const getBooking = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const bookings = await Booking.find({ userId });
      res.status(200).json({ success: true, data: bookings });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch user bookings' });
    }
  };