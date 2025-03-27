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

export { getUsersForSidebar };
