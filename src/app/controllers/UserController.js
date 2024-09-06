import UserModel from "../models/UserModel.js";

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id).populate("compareList");
    if (!user) {
      return res.status(404).json({ success: true, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get success", data: user.compareList });
  } catch (error) {
    return res.status(400).json({ success: false, err: error.message });
  }
};
export const changeInformation = async (req, res) => {
  const id = req.params.id;
  const { email, username, age, phone } = req.body;
  const avatarUrl = req.file
    ? `http://localhost:4000/images/${req.file.filename}`
    : undefined;
  try {
    if (
      req.file.mimetype !== "image/jpeg" &&
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/gif"
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
        });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        username: username,
        email: email,
        phone: phone,
        age: age,
        avatar: avatarUrl,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(401).json({ success: false, message: "Update failed" });
    }
    return res.status(200).json({
      success: true,
      message: "Updated successful",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(404).json({ success: true, error: error.message });
  }
};
