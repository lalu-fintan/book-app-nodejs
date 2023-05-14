const jwt = require("jsonwebtoken");

const requireRole = (role) => {
  return (req, res, next) => {
    const header = req.headers.authorization; //this is the way to see the access token
    const token = header.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is required" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (decoded.user.role !== role) {
        return res
          .status(403)
          .json({ message: "You are not authorized to access this resource" });
      }
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }
  };
};

module.exports = requireRole;
