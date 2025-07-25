import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Use environment variable

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; // Ensure `id` matches the payload structure
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
