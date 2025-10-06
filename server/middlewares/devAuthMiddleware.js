import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

// DEV MODE: Bypass authentication for testing
// IMPORTANT: Only use this in development! Remove before production deployment
const devAuthMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  
  // If no token provided, create a mock user for testing
  if (!token || token === "Bearer null" || token === "Bearer undefined") {
    console.log("⚠️ DEV MODE: Using mock user for testing");
    // Create a mock user ID for testing
    req.userId = "507f1f77bcf86cd799439011"; // Mock ObjectId
    req.user = {
      _id: "507f1f77bcf86cd799439011",
      username: "testuser",
      email: "test@test.com"
    };
    return next();
  }

  // If token exists, try to verify it normally
  const jwtToken = token.replace("Bearer", "").trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    req.user = userData;
    req.userId = userData._id;
    req.token = jwtToken;
    next();
  } catch (error) {
    // If token verification fails, use mock user for testing
    console.log("⚠️ DEV MODE: Token invalid, using mock user for testing");
    req.userId = "507f1f77bcf86cd799439011"; // Mock ObjectId
    req.user = {
      _id: "507f1f77bcf86cd799439011",
      username: "testuser",
      email: "test@test.com"
    };
    next();
  }
};

export default devAuthMiddleware;
