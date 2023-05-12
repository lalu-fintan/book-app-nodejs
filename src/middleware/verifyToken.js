const jwt = require("jsonwebtoken");
const authModule = require("../model/authModule");

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization; //this is the way to see the access token
  const token = header.split(" ")[1];

  if (!token) {
    res.status(400).json({ message: "you don't have a token" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user, next) => {
    if (err) {
      res.status(400).json({ message: "Invalid Token" });
    }

    user = token;
    console.log(user);
  });
};

// const checkRole = async (req, res, next) => {
//   let { name } = req.body;

//   const user = await authModule.findOne({ name });
//   !role.includes(user.role)
//     ? res.status(401).json("Sorry you do not have access to this route")
//     : next();
// };

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(400).json({ message: "not Allowed" });
    }
    next();
  };
};

module.exports = { verifyToken, checkRole };
