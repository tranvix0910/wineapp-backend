import AddressModel from "../models/AddressModel.js";

export const addNewAddress = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const existingAddresses = await AddressModel.find({ userId: userId });
    if (existingAddresses.length <= 0) {
      req.body.addressDefault = true;
    } else if (req.body.addressDefault) {
      await AddressModel.updateMany(
        { userId: userId, addressDefault: true },
        { $set: { addressDefault: false } }
      );
    }
    const newAddress = new AddressModel({ ...req.body, userId: userId });
    if (!newAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address" });
    }
    await newAddress.save();
    return res.status(200).json({
      success: true,
      message: "Add new address successful",
      data: newAddress,
    });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
};

export const updatedAddress = async (req, res) => {
  const userId = req.user._id;
  const addressId = req.params.id;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    if (req.body.addressDefault) {
      await AddressModel.updateMany(
        { userId: userId, addressDefault: true },
        { $set: { addressDefault: false } }
      );
    }
    const updateInfor = await AddressModel.findByIdAndUpdate(
      addressId,
      {
        ...req.body,
      },
      { new: true }
    );
    if (!updateInfor) {
      return res
        .status(400)
        .json({ success: false, message: "Address not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Update successful" });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
};

export const getAllAddresses = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const addresses = await AddressModel.find({ userId: userId }).sort({
      addressDefault: -1,
    });
    return res
      .status(200)
      .json({ success: true, message: "Get successful", data: addresses });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  const userId = req.user._id;
  const addressId = req.params.id;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    await AddressModel.findByIdAndDelete(addressId);
    return res
      .status(200)
      .json({ success: true, message: "Delete successful" });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
};
