import User from "../models/user.model.js";
import { verifyUserToken } from "../utils/jwt.js";

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({ message: "Invalid token, Unauthorized!" });
    }

    const decodedToken = verifyUserToken(token);

    if (!decodedToken) {
      return res.status(401).json({ message: "Token is Invalid!" });
    }

    const isValidUser = await User.findById(decodedToken._id).select(
      "-password"
    );

    if (!isValidUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = isValidUser;
    next();
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { authenticateUser };
