import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();  // Loads environment variables from .env file
import connectDB from "./config/db.js"; // Correctly import connectDB function
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notfound } from "./middlewares/errorMiddleware.js";

const PORT = process.env.PORT || 5000; // Use environment PORT or default to 5000
connectDB();  // Connect to MongoDB

console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

// Set __dirname to current directory
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // Any route that is not /api/users will load index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  // In development, we don't need to load index.html
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notfound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
