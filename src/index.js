import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import AddressRoutes from "./routes/address.js";
import AuthRoutes from "./routes/auth.js";
import BlogRoutes from "./routes/blog.js";
import ContactRoutes from "./routes/contact.js";
import CompareRoutes from "./routes/compare.js";
import CartRoutes from "./routes/cart.js";
import FavoriteRoutes from "./routes/favorite.js";
import OtpRoutes from "./routes/otp.js";
import ReviewRoutes from "./routes/review.js";
import UserRoutes from "./routes/user.js";
import WineRoutes from "./routes/wine.js";
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
// database
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("connect to database successfull");
  } catch (error) {
    console.log("connect to database failed", error.message);
  }
};

// middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static("public"));

// routes
app.use("/api/v1/address", AddressRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/blog", BlogRoutes);
app.use("/api/v1/contact", ContactRoutes);
app.use("/api/v1/compare", CompareRoutes);
app.use("/api/v1/cart", CartRoutes);
app.use("/api/v1/favorite", FavoriteRoutes);
app.use("/api/v1/otp", OtpRoutes);
app.use("/api/v1/reviews", ReviewRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/wines", WineRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
