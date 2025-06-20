import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    // Dummy data for demo
    const dummy = {
      1: {
        title: "Apartment in Bengaluru",
        image: "https://images.unsplash.com/photo-1560185127-6c2ce10f0c5b?auto=format&fit=crop&w=600&q=80",
        description: "A cozy apartment in the heart of Bengaluru. Perfect for business or leisure.",
        price: 3264,
        location: "Bengaluru, India",
      },
      // ...add for other ids
    };
    setListing(dummy[id]);
  }, [id]);

  if (!listing) return <div style={{padding: 40}}>Loading...</div>;

  return (
    <div style={{maxWidth: 800, margin: "120px auto 40px", background: "#fff", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", padding: 32}}>
      <img src={listing.image} alt={listing.title} style={{width: "100%", borderRadius: 12, marginBottom: 24}} />
      <h1 style={{fontSize: 32, marginBottom: 12}}>{listing.title}</h1>
      <div style={{color: "#666", marginBottom: 18}}>{listing.location}</div>
      <div style={{fontSize: 18, marginBottom: 18}}>{listing.description}</div>
      <div style={{fontWeight: "bold", color: "#4caf50", fontSize: 22}}>₹{listing.price} / 2 nights</div>
      {/* You can add a calendar and booking button here */}
    </div>
  );
}
