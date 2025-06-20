import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function HostDashboard() {
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/listings/host/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings(res.data);
    } catch (err) {
      console.error("Error fetching host listings:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings(listings.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Error deleting listing:", err.message);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Host Dashboard</h1>
      <Link
        to="/listing/create"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-6 inline-block"
      >
        Create New Listing
      </Link>
      {listings.length === 0 ? (
        <p>You have not listed any properties yet.</p>
      ) : (
        <div className="grid gap-4">
          {listings.map((listing) => (
            <div key={listing._id} className="border p-4 rounded shadow flex gap-4">
              <img
                src={listing.image || "https://via.placeholder.com/150"}
                alt={listing.title}
                className="w-32 h-24 object-cover rounded"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-bold">{listing.title}</h2>
                <p>{listing.location}</p>
                <p>₹{listing.price}</p>
              </div>
              <div className="flex flex-col justify-center">
                <Link
                  to={`/listing/edit/${listing._id}`}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mb-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
