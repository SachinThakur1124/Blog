import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envVars.config.js";
import userModel from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  // console.log("Fetched User", req.headers.authorization.split(" ")[1]);
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { UserId } = jwt.verify(token, JWT_SECRET);
  // console.log(user);
  const user = await userModel.findById(UserId);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  user.password = "";
  req.user = user;
  next();
};

export default verifyToken;
