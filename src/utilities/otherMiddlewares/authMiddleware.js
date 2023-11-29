import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key"); // Replace 'your_secret_key' with your actual secret key
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
