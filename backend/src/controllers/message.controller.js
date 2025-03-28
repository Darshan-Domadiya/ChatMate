import Message from "../models/message.model.js";
import User from "../models/user.model.js";

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

export { getUsersForSidebar, getMessages };
