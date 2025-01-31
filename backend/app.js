import path from "path";
import express from "express";
import productRoute from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import uploadRoute from "./routes/uploadProductImage.route.js";
import uploadBlogRoute from "./routes/uploadBlogImage.route.js";
import blogRoute from "./routes/blog.route.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

// Base Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Static Folder for Uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Routes
app.use("/api/products", productRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload/products", uploadRoute);
app.use("/api/upload/blogs", uploadBlogRoute);
// Uncomment or add more routes as needed
// app.use("/api/payment", paymentRoute);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

// Export the app instance
export default app;
