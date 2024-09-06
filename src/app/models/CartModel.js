import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        wine: { type: mongoose.Schema.Types.ObjectId, ref: "wines" },
        quantity: { type: Number, default: 1 },
        _id: false,
      },
    ],
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    payment: {
      type: String,
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("carts", CartSchema);
export default CartModel;
