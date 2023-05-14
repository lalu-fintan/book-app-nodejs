const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModule = require("../model/authModule");
const UserId = require("./uuid/registerId");

//register

const register = asyncHandler(async (req, res) => {
  const { name, email, phonenumber, password, role } = req.body;
  if (!name || !email || !phonenumber || !password) {
    res.status(400);
    throw new Error("All the fields are required");
  }
  const verifyEmail = await authModule.findOne({ email });
  if (verifyEmail) {
    res.status(400);
    throw new Error("email is already exist");
  }

  const verifyPhone = await authModule.findOne({ phonenumber });
  if (verifyPhone) {
    res.status(400);
    throw new Error("phone number is already exist");
  }

  const hasePassword = await bcrypt.hash(password, 10);
  const user = await authModule.create({
    userId: UserId(),
    name,
    email,
    phonenumber,
    password: hasePassword,
    role,
  });

  if (user) {
    res.status(200).json({ id: user.userId, name: user.name, role: user.role });
  } else {
    res.status(400);
  }
});

//login

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("fields are required");
  }
  const user = await authModule.findOne({ email });

  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          userId: user.userId,
          email: user.email,
          role: user.role,
        },
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2days" }
    );

    res.status(200).json({
      status: "success",
      data: user,
      accessToken,
    });
  } else {
    res.status(400).send("it not valid");
  }
});

module.exports = { register, login };
