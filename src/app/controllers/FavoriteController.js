import FavoriteModel from "../models/FavoriteModel.js";
import WineModel from "../models/WineModel.js";

export const toggleFavoriteWine = async (req, res) => {
  const userId = req.user._id;
  const { wineId } = req.body;
  try {
    const existFavorite = await FavoriteModel.findOne({ userId, wineId });
    if (existFavorite) {
      await FavoriteModel.deleteOne({ _id: existFavorite._id });
      await WineModel.findByIdAndUpdate(wineId, {
        isFavorite: false,
      });
      res.status(200).json({ success: true, message: "delete success" });
    } else {
      await WineModel.findByIdAndUpdate(wineId, {
        isFavorite: true,
      });
      const newFavorite = new FavoriteModel({ wineId: wineId, userId: userId });
      await newFavorite.save();
      res.status(200).json({
        success: true,
        message: "add success",
        data: newFavorite,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "add failed" });
  }
};
export const getFavoriteWine = async (req, res) => {
  const userId = req.user._id;
  try {
    const favoritesWines = await FavoriteModel.find({
      userId: userId,
    }).populate("wineId");
    res
      .status(200)
      .json({ success: true, message: "get success", data: favoritesWines });
  } catch (error) {
    res.status(400).json({ success: false, message: "get failed" });
  }
};
