import ContactModel from "../models/ContactModel.js";

export const addContact = async (req, res) => {
  const newContact = new ContactModel(req.body);
  try {
    const contact = await newContact.save();
    res
      .status(200)
      .json({ success: true, message: "Contact was successful", data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
