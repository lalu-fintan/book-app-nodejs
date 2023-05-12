const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./src/db/dbConfig");
const authRoutes = require("./src/routes/authRoutes");
const userRouter = require("./src/routes/userRouter");
const adminRouter = require("./src/routes/adminRouter");
const moderatorRouter = require("./src/routes/moderatorRouter");

const app = express();
const port = process.env.PORT;
connectDb();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/moderator", moderatorRouter);

app.listen(port, () => {
  console.log(`connected on the ${port}`);
});
