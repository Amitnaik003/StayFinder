import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function AddListing() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await API.post("/listings", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Listing created!");
      navigate("/host");
    } catch (err) {
      alert("Failed to create listing");
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">Add New Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
        <input name="location" onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" required />
        <input name="price" onChange={handleChange} placeholder="Price" type="number" className="w-full border p-2 rounded" required />
        <input name="image" onChange={handleChange} placeholder="Image URL" className="w-full border p-2 rounded" />
        <textarea name="description" onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Listing
        </button>
      </form>
    </div>
  );
}
