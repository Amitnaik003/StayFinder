import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import ListingDetail from "./pages/ListingDetail";  
import HostDashboard from "./pages/HostDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AddListing from "./pages/AddListing";  
import MyBookings from "./pages/MyBookings"; 
import EditListing from "./pages/EditListing"; 
import CreateListing from "./pages/CreateListing";

function App() {
  return ( 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route 
          path="/listing/:id"
          element={
            <PrivateRoute>
              <ListingDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/add"
          element={
            <PrivateRoute>
              <AddListing />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/dashboard"
          element={
            <PrivateRoute>
              <HostDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/listing/edit/:id"
          element={
            <PrivateRoute>
              <EditListing />
            </PrivateRoute>
          }
        />
        <Route
          path="/listing/create"
          element={
            <PrivateRoute>
              <CreateListing />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
