import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy listings data (replace with API call in production)
  useEffect(() => {
    const dummyListings = [
      {
        id: 1,
        title: "Apartment in Bengaluru",
        location: "Bengaluru, India",
        price: 3264,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdy2xCqI5XIVajXtiuKmGF5a1Hp2dyo5_Ozg&s",
      },
      {
        id: 2,
        title: "Flat in Goa",
        location: "South Goa, India",
        price: 5250,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzvt-9aZmeU1QnGWASJqttuhYn6EV7p_zfd1fFA9kpAbA6u9C3wNPzZDMnpQ6LFE0UURE&usqp=CAU",
      },
      {
        id: 3,
        title: "Guest House in Majorda",
        location: "Majorda, Goa, India",
        price: 7418,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQT1MZlyahx5xOJxpw4hd0fzeU6myRUNEDcf7UlG3RWOxSAdgbpde11jaNBf2M3ohvI5I&usqp=CAU",
      },
      {
        id: 4,
        title: "Apartment in Colva",
        location: "Colva, Goa, India",
        price: 4132,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlbeLJKT5MxCdDte_Q6tGZghVpSfn25SX60QGi3FBQJkHeabhfloTBCrggSD62nX2ZVuk&usqp=CAU",
      },
      {
        id: 5,
        title: "Flat in Benaulim",
        location: "Benaulim, Goa, India",
        price: 6800,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4_uyI-QkSzhm3oT2_-I91DKCJcZNU-D9eWsyl5c5atU8iRNandveuMfrmRRkTEsRHqN8&usqp=CAU",
      },
      {
        id: 6,
        title: "Luxury Villa in Jaipur",
        location: "Jaipur, India",
        price: 12000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYhN8OgPzq4z4R4puJDI2uK6Eo-OV2O4ShfNx5sPyB0sfQseDOp0pE-SNYV6D-PskocU&usqp=CAU",
      },
      {
        id: 7,
        title: "Beach House in Kerala",
        location: "Alleppey, Kerala, India",
        price: 8500,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-jxEodZ_p20F2r_J41apLnCRx-fw23APZpa7EkObVVAQjTniWLkqLzXHQGrDFbvZKQik&usqp=CAU",
      },
      {
        id: 8,
        title: "Cottage in Shimla",
        location: "Shimla, Himachal Pradesh, India",
        price: 6000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1yDmQcU6RN0eMl72JPv3mc4pjDMmGc4VSEBZO5oX4Dvf-nfjVAKr5o2Uoyo1W0LaRoao&usqp=CAU",
      },
      {
        id: 9,
        title: "Penthouse in Mumbai",
        location: "Mumbai, India",
        price: 15000,
        image: "https://pix10.agoda.net/hotelImages/980/9808799/9808799_19101304270082025788.jpg?ca=9&ce=1&s=414x232",
      },
      {
        id: 10,
        title: "Farmhouse in Punjab",
        location: "Amritsar, Punjab, India",
        price: 7000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzY561oI-GeoJTkcHfzANGa1mro3VrKeKUtROMEB4F34uuwdM8Ax7Lfk26S-7EIPPPxEw&usqp=CAU",
      },
      {
        id: 11,
        title: "Studio Apartment in Delhi",
        location: "Delhi, India",
        price: 5000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-y73qc0aIM5ROyCPjXiXhrQMJ4c7k3UG4NA&s",
      },
      {
        id: 12,
        title: "Treehouse in Munnar",
        location: "Munnar, Kerala, India",
        price: 9000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUjibZg6Uz_mMVDMQ1GER_fnROTjjW0JFP1P8DwcsMB8AH1wkt0IG_ymCbNVYZkBQ1xBM&usqp=CAU",
      },
      {
        id: 13,
        title: "Cabin in Manali",
        location: "Manali, Himachal Pradesh, India",
        price: 6500,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThJBJ6UhGkjcKcD8jEUMV_3nKBiWBKN5OPEYySE9lQ1OQK04Gw3aZJ_-IgOqQbrIAl8pY&usqp=CAU",
      },
      {
        id: 14,
        title: "Villa in Udaipur",
        location: "Udaipur, Rajasthan, India",
        price: 10000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzS1Dn8c9hfGOxAGAMe79kobRZ4DQUdB2ddw&s",
      },
      {
        id: 15,
        title: "Luxury Apartment in Hyderabad",
        location: "Hyderabad, India",
        price: 8000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfin9gnA-7Iq-ELVP3GhXrPhQbd_Lx9HXC-g&s",
      },
    ];
    setListings(dummyListings);
    setFilteredListings(dummyListings);
    setLoading(false);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = listings;
    if (searchQuery) {
      filtered = filtered.filter((l) =>
        l.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (minPrice) {
      filtered = filtered.filter((l) => l.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((l) => l.price <= parseInt(maxPrice));
    }
    setFilteredListings(filtered);
  }, [searchQuery, minPrice, maxPrice, listings]);

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">StayFinder</Link>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by location"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              style={{ width: 90 }}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              style={{ width: 90 }}
            />
            <button>Search</button>
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

      {/* Main Content */}
      <div className="main-content">
        <h1 className="title">Explore Your Perfect Stay</h1>
        {loading ? (
          <div className="spinner"></div>
        ) : filteredListings.length === 0 ? (
          <div className="no-results">No stays found for your search.</div>
        ) : (
          <div className="listings-grid">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="listing-card">
                <div className="card-image-wrap">
                  <img src={listing.image} alt={listing.title} className="listing-image" />
                  <span className="favorite-heart">♡</span>
                </div>
                <div className="listing-details">
                  <h2 className="listing-title">{listing.title}</h2>
                  <p className="listing-location">{listing.location}</p>
                  <p className="listing-price">₹{listing.price} / 2 nights</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 StayFinder. All rights reserved.</p>
      </footer>
    </div>
  );
}
