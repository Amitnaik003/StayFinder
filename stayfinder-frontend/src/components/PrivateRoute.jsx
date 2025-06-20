import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // Add token validation logic here if needed
  const isAuthenticated = token && token !== "undefined";

  return isAuthenticated ? children : <Navigate to="/login" />;
}
