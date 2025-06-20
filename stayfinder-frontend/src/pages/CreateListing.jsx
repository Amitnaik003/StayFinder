import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function CreateListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: "",
    latitude: "",
    longitude: "",
  });
  const [availability, setAvailability] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvailabilityChange = (ranges) => {
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    const dates = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setAvailability(dates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/listings", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Listing created successfully!");
      navigate("/host/dashboard");
    } catch (err) {
      console.error("Failed to create listing:", err.message);
      alert("Failed to create listing.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Listing</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          placeholder="Latitude"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          placeholder="Longitude"
          className="p-2 border rounded"
        />
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Set Availability</h2>
          <DateRange
            editableDateInputs={true}
            onChange={handleAvailabilityChange}
            moveRangeOnFirstSelection={false}
            ranges={[
              {
                startDate: new Date(),
                endDate: new Date(),
                key: "selection",
              },
            ]}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}