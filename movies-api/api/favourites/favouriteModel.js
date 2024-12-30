import mongoose from "mongoose";

const FavouriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: String, required: true },
});

const Favourite = mongoose.model("Favourite", FavouriteSchema);
export default Favourite;
