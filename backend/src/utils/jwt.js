import jwt from "jsonwebtoken";

function createUserToken(user) {
  const userId = user._id;

  return jwt.sign(userId, process.env.SECRET_KEY, { expiresIn: "7d" });
}

function verifyUserToken(userToken) {

  return jwt.verify(userToken, process.env.SECRET_KEY);
}

export { createUserToken, verifyUserToken };
