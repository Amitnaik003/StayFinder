import express from "express";
import Booking from "../models/Booking.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// GET /api/bookings - Fetch all bookings
router.get("/", verifyToken, async (req, res) => {
  console.log("GET /api/bookings called");
  console.log("User ID:", req.userId);
  try {
    const bookings = await Booking.find().populate("listing").populate("user");
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
