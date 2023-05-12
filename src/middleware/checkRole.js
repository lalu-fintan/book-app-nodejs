const role = require("../helper/role");

module.exports = async (req, res, next) => {
  if (req.user.role === "Admin" || req.user.role === "Moderator") {
    next();
  } else {
    res.status(403).json({ message: "access denied" });
  }
};
