import UserModel from "../models/UserModel.js";

export const toggleCompare = async (req, res) => {
  const userId = req.user._id;
  const { wineId } = req.body;
  try {
    const user = await UserModel.findById(userId);

    if (user.compareList.length >= 3 && !user.compareList.includes(wineId)) {
      return res.status(200).json({
        success: false,
        message: "Maximum products to compare. Limit is 3!",
      });
    }

    let compareList;
    if (user.compareList.includes(wineId)) {
      compareList = await UserModel.findByIdAndUpdate(userId, {
        $pull: { compareList: wineId },
      }).populate("compareList");
      return res.status(200).json({
        success: true,
        message: "Item removed to the comparison list!",
        data: compareList,
      });
    } else {
      compareList = await UserModel.findByIdAndUpdate(userId, {
        $push: { compareList: wineId },
      }).populate("compareList");
      return res.status(200).json({
        success: true,
        message: "Item added to the comparison list!",
        data: compareList,
      });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const removeCompare = async (req, res) => {
  const userId = req.user._id;
  const { wineId } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "You're not authenticated. Please sign in !!",
      });
    }
    const index = user.compareList.indexOf(wineId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the compare list",
      });
    }
    user.compareList.splice(index, 1);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
      data: user.compareList,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
