import mongoose from "mongoose";
 
const listingSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  description: { type: String, required: true },   
  price: { type: Number, required: true }, 
  location: { type: String, required: true },
  image: { type: String, required: true },  
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  latitude: { type: Number, required: true },  
  longitude: { type: Number, required: true },
  availability: [{ type: Date, required: true }], // Array of available dates
});

export default mongoose.model("Listing", listingSchema);
