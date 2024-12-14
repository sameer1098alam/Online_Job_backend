const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate a user using a JWT token
 */
const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    // Verify token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info (id, role) to the request object
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token." });
  }
};

/**
 * Middleware to enforce role-based access control
 * @param {Array} roles - List of roles allowed to access the route
 */
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access Denied. Insufficient permissions." });
    }
    next();
  };
};

module.exports = { authMiddleware, roleMiddleware };
