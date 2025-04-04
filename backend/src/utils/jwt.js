import jwt from "jsonwebtoken";

function createUserToken(user) {
  return jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
}

function verifyUserToken(userToken) {
  return jwt.verify(userToken, process.env.SECRET_KEY);
}

export { createUserToken, verifyUserToken };
