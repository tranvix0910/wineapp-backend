import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      requied: true,
    },
    fullName: {
      type: String,
      requied: true,
    },
    phone: {
      type: String,
      requied: true,
    },
    cityName: {
      type: String,
      requied: true,
    },
    streetName: {
      type: String,
      requied: true,
    },
    label: {
      type: String,
      requied: true,
      default: "home",
    },
    addressDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const AddressModel = mongoose.model("addresses", AddressSchema);

export default AddressModel;
