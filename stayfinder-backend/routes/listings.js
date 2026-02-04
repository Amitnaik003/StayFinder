import express from "express";
import Listing from "../models/Listing.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router(); 

// GET all listings
router.get("/", async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query; 

    const filter = {};  
    if (location) { 
      filter.location = { $regex: location, $options: "i" }; // Case-insensitive search
    } 
    if (minPrice) { 
      filter.price = { ...filter.price, $gte: Number(minPrice) }; // Minimum price
    }
    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) }; // Maximum price
    }

    const listings = await Listing.find(filter);
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single listing by ID
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new listing
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, price, location, image, latitude, longitude } = req.body;

    if (!title || !description || !price || !location || !image || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newListing = new Listing({
      ...req.body,
      owner: req.userId, // Associate the listing with the logged-in user
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /listings/host/my - Fetch listings created by the logged-in user
router.get("/host/my", verifyToken, async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.userId });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /listings/:id - Delete a listing created by the logged-in user
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const listing = await Listing.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });

    if (!listing) {
      return res.status(404).json({ error: "Listing not found or not owned by you" });
    }

    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /listings/:id - Update a listing created by the logged-in user
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { title, description, price, location, latitude, longitude } = req.body;

    const updatedListing = await Listing.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { title, description, price, location, latitude, longitude },
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ error: "Listing not found or not owned by you" });
    }

    res.json(updatedListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
