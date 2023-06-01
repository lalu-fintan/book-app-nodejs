const express = require("express");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const compression = require("compression");
const connectDb = require("./src/db/dbConfig");
const authRoutes = require("./src/routes/authRoutes");
const adminRouter = require("./src/routes/adminRouter");

const app = express();
const port = process.env.PORT;
connectDb();
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/books", adminRouter);

app.listen(port, () => {
  console.log(`connected on the ${port}`);
});
