import mongoose from "mongoose";

const WineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    detailImage: {
      type: [String],
    },
    newPrice: {
      type: String,
      required: true,
    },
    minPrice: {
      type: String,
    },
    maxPrice: {
      type: String,
    },
    star: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
    },
    isSale: {
      type: Boolean,
      default: false,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    topRated: {
      type: Boolean,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
      },
    ],
  },
  { timestamps: true }
);

const WineModel = mongoose.model("wines", WineSchema);

export default WineModel;
