import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";

// Connect to Database
connectDB();

// Define the Port
const PORT = process.env.PORT || 8000;

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
