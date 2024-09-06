import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    wineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wines",
    },
    username: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("reviews", ReviewSchema);
export default ReviewModel;
