import BlogModel from "../models/BlogModel.js";

export const getBlogs = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const blogs = await BlogModel.find()
      .skip(page * 3)
      .limit(3);
    res.status(200).json({
      success: true,
      message: "get success",
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({ success: true, message: "get failed" });
  }
};

export const getNewst = async (req, res) => {
  try {
    const newest = await BlogModel.find({ newest: true });
    res
      .status(200)
      .json({ success: true, message: "get success", data: newest });
  } catch (error) {
    res.status(500).json({ success: true, message: "get failed" });
  }
};

export const getBlogCount = async (req, res) => {
  try {
    const blogCount = await BlogModel.estimatedDocumentCount();
    res.status(200).json({ success: true, data: blogCount });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
