import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { // 🔄 changed from productId to tourId
      type:String
    },
    userEmail: {
      type: String
    },
    fullName: {
      type: String,
      required: true,
    },
    tourName:{
        type:String,
        require:true,

    },
    guestSize:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    bookingAt:{
        type:Date,
        
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
