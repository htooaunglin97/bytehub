import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/user.model.js";




// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;
  console.log(token);
  

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Find the user by ID from the token and exclude the password field
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }

      // Attach the user to the request object
      req.user = user;

      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    console.error("No token found in request cookies");
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Middleware to ensure the user's email is verified
const verifyEmailProtect = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isVerified) {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied, email not verified");
  }
});

// User must be an admin
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

export { protect, verifyEmailProtect, admin };
