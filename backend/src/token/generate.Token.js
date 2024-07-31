import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envVars.config.js";

const generateToken = async (UserId) => {
  const token = await jwt.sign({ UserId }, JWT_SECRET, {
    expiresIn: "15d",
  });
  return token;
};

export default generateToken;
