import ReviewModel from "../models/ReviewModel.js";
import WineModel from "../models/WineModel.js";

export const createReview = async (req, res) => {
  const wineId = req.params.wineId;
  const newReview = new ReviewModel({ ...req.body });
  try {
    const savedReview = await newReview.save();
    await WineModel.findByIdAndUpdate(wineId, {
      $push: { reviews: savedReview._id },
    });
    res
      .status(200)
      .json({ success: true, message: "review submitted", data: savedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fail to submit" });
  }
};
export const getReviews = async (req, res) => {
  const id = req.params.id
  try {
    const reviews = await ReviewModel.findById(id);
    res
      .status(200)
      .json({ success: true, message: "get success", data: reviews });
  } catch (error) {
    res.status(400).json({ success: false, message: "get failed" });
  }
};
