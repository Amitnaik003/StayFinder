import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";  
import { DateRange } from "react-date-range"; 
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
 
export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({ 
    title: "",
    description: "",
    price: "",
    location: "",
    latitude: "",
    longitude: "",
  });
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/listings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setListing(res.data);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          price: res.data.price,
          location: res.data.location,
          latitude: res.data.latitude,
          longitude: res.data.longitude,
        });
      } catch (err) {
        console.error("Failed to fetch listing:", err.message);
      }
    };

    fetchListing();
  }, [id]);

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
      await API.put(`/listings/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Listing updated successfully!");
      navigate("/host/dashboard");
    } catch (err) {
      console.error("Failed to update listing:", err.message);
      alert("Failed to update listing.");
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Listing</h1>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}
