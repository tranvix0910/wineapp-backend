import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  wineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "wines",
  },
});

const FavoriteModel = mongoose.model("favorites", FavoriteSchema);
export default FavoriteModel;
