import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateToken from "../token/generate.Token.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envVars.config.js";

export const userRegisterController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const existedUser = await userModel.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      user: { ...newUser._doc, password: "" },
    });
  } catch (error) {
    console.log("Error :  error while registering user", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error !!" });
  }
};

export const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExisted = await userModel.findOne({ email });
    if (!userExisted) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // console.log(userExisted);
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      userExisted.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }
    // console.log("Pass is hash", isPasswordCorrect);
    const token = await generateToken(userExisted._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log("Error :  error while logging user", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error !!" });
  }
};

export const verfyTokenController = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  try {
    const decodedToken = await jwt.verify(token, JWT_SECRET);
    console.log(decodedToken);
    const user = await userModel.findById(decodedToken.UserId);
    console.log(user);
    if (!user) {
      res.status(500).json({ success: false, error: "User does not exists" });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._doc._id,
        name: user._doc.name,
        email: user._doc.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
