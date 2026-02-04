import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";
import registerBg from "../assets/loginbg.jpg"; // ✅ Use the same background image or a different one

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen min-w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${registerBg})` }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
        <footer className="text-center text-gray-500 text-sm mt-6">
          © 2025 StayFinder. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get('/bookings'); // adjust endpoint if your backend uses /api/bookings
        const data = res?.data ?? res;
        if (mounted) setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.message || err.message || 'Failed to load bookings');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBookings();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-4">Loading your bookings...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!bookings.length) return <div className="p-4">You have no bookings yet.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
      <ul className="space-y-4">
        {bookings.map((b) => {
          const id = b._id ?? b.id;
          const listing = b.listing ?? b.property ?? {};
          const title = listing.title ?? b.title ?? 'Untitled listing';
          const start = b.startDate ? new Date(b.startDate).toLocaleDateString() : b.startDate ?? 'N/A';
          const end = b.endDate ? new Date(b.endDate).toLocaleDateString() : b.endDate ?? 'N/A';
          const price = b.totalPrice ?? b.price ?? 'N/A';

          return (
            <li key={id} className="border rounded p-4 flex justify-between items-start">
              <div>
                <div className="font-medium">{title}</div>
                <div className="text-sm text-gray-600">Dates: {start} — {end}</div>
                <div className="text-sm text-gray-800">Total: {price}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
