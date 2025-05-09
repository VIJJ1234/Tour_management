import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

//  Corrected CORS Options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only your frontend
  credentials: true,               // Allow credentials (cookies)
};

mongoose.set("strictQuery", false);

// MongoDB Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB database connected');
  } catch (err) {
    console.error('MongoDB database connection failed:', err);
    process.exit(1);
  }
};

//  Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

//  API Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);

// Test Route
app.get("/", (req, res) => {
  res.send("API is working!");
});

//  Start the Server
app.listen(port, async () => {
  await connect();
  console.log(`Server listening on port ${port}`);
});
