const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./src/db/dbConfig");
const authRoutes = require("./src/routes/authRoutes");
const adminRouter = require("./src/routes/adminRouter");

const app = express();
const port = process.env.PORT;
connectDb();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/books", adminRouter);

app.listen(port, () => {
  console.log(`connected on the ${port}`);
});
