import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import "./Home.css"; // Reuse the same CSS for header/nav

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/bookings/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to load bookings", err.message);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="home-container">
      {/* Header (same as Home page) */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            StayFinder
          </Link>
          <div className="search-bar" style={{ visibility: "hidden" }}>
            {/* Empty search bar for layout consistency */}
            <input type="text" style={{ width: 120 }} disabled />
            <input type="number" style={{ width: 90 }} disabled />
            <input type="number" style={{ width: 90 }} disabled />
            <button disabled>Search</button>
          </div>
          <div className="nav-links">
            <Link to="/my-bookings">My Bookings</Link>
            <Link to="/host/dashboard">Host Dashboard</Link>
            <Link to="/profile">
              <span className="profile-avatar">👤</span> My Profile
            </Link>
          </div>
        </div>
      </header>

      {/* Welcome message */}
      <div
        style={{
          background: "#f7f7f7",
          padding: "32px 0 16px 0",
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "500",
        }}
      >
        Welcome to the booking page
      </div>

      {/* Bookings content */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
        {bookings.length === 0 ? (
          <p>You haven't booked any listings yet.</p>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="border p-4 rounded-lg shadow flex gap-4"
              >
                <img
                  src={
                    booking.listing.image ||
                    "https://via.placeholder.com/150"
                  }
                  alt={booking.listing.title}
                  className="w-32 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {booking.listing.title}
                  </h2>
                  <p className="text-gray-600">{booking.listing.location}</p>
                  <p>
                    📅{" "}
                    {new Date(booking.checkIn).toLocaleDateString()} →{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}