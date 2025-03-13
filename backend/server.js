import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// allow us to accpet JSON data in the body
app.use(express.json());

// call the api routes
app.use("/api/products", productRoutes);

// Postman
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
})

// PASSWORD
// zVNe0giuf2wLOLm0 