import blogModel from "../models/blog.model.js";

export const createBlogController = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    // console.log("Request fetched", req.file.filename);
    if (!title || !description || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    const existedBlog = await blogModel.findOne({ title });
    if (existedBlog) {
      return res
        .status(404)
        .json({ success: false, error: "with this title already blog exist" });
    }
    const blog = new blogModel({
      title,
      description,
      image: req.file.filename,
      user: req.user._id,
    });
    await blog.save();
    res
      .status(201)
      .json({ success: true, message: "blog created successfully!" });
  } catch (error) {
    console.log("Error : error while creating blog", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllPostController = async (req, res, next) => {
  try {
    const blogs = await blogModel.find({});
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.log("Error : error while creating blog", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getSIngleUserBlogByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const getUserPost = await blogModel({
      user: id,
    });
    res.status(200).json({ success: true, posts: getUserPost });
  } catch (error) {
    console.log("Error: Error While Fetching Blogs :", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
