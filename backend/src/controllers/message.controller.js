import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../utils/socketio.js";

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    return res
      .status(200)
      .json({ message: "All users data!", users: allUsers });
  } catch (error) {
    console.log("Errow while fetching all users", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: clickedUserId } = req.params;
    const currentUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: clickedUserId, receiverId: currentUserId },
        { senderId: currentUserId, receiverId: clickedUserId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Errow while fetching messages", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { image, text } = req.body;

    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadedResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // real time functionality of socket.io...
    const receiverSocketid = getReceiverSocketId(receiverId);
    if (receiverSocketid) {
      io.to(receiverSocketid).emit("newMessage", newMessage);
    }

    return res
      .status(201)
      .json({ message: "New message is created!", newMessage });
  } catch (error) {
    console.log("Errow while fetching messages", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export { getUsersForSidebar, getMessages, sendMessage };
