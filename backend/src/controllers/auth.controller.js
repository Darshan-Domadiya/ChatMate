import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createUserToken } from "../utils/jwt.js";
import cloudinary from "../utils/cloudinary.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!(email && password)) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isUser = await User.findOne({ email });

    if (!isUser) {
      return res
        .status(404)
        .json({ message: "User doesn't exists! Please login" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, isUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = createUserToken(isUser);

    res.cookie("token", token);

    return res.status(200).json({ message: "User login successful!" });
  } catch (error) {
    console.log("ERROR while login user", error);
  }
};

const signUp = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;

  try {
    if (!(fullName && email && password)) {
      return res.status(404).json({ message: "All fields are required*!" });
    }

    if (password.length < 6) {
      return res
        .status(404)
        .json({ message: "Password must be at least 6 characters!" });
    }

    const isUserExists = await User.findOne({ email: email });

    if (isUserExists) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profilePic: profilePic ? profilePic : "",
    });

    if (!createdUser) {
      return res.status(500).json({ message: "Internal server error!" });
    }

    const newUser = await User.findById(createdUser._id).select("-password");

    const token = createUserToken(newUser);

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json({
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error) {
    console.log("ERROR while user signup", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "User logout" });
  } catch (error) {
    console.log("ERROR while logout");
    return res
      .status(500)
      .json({ message: "Something went wrong while logout user!" });
  }
};

const updateProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body;

    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required!" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(profilePic);

    if (!cloudinaryResponse) {
      return res
        .status(500)
        .json({
          message: "Something went wrong while uploading profile image",
        });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: cloudinaryResponse.secure_url,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({
        message: "Profile pic updated successfully!",
        user: updatedUser,
      });
  } catch (error) {
    console.log("ERROR while uploading profile pic", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { loginUser, signUp, logoutUser, updateProfilePic };
