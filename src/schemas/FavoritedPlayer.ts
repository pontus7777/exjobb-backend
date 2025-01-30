//FavoritedPlayer.ts
// FavoritedPlayer.ts
import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the document
interface IFavoritedPlayer extends Document {
  userId: mongoose.Types.ObjectId; // The user who is favoriting
  favoritedUserId: mongoose.Types.ObjectId; // The user being favorited
  createdAt: Date; // Timestamp of when the favorite was created
  updatedAt: Date; // Timestamp of when the favorite was last updated
}

// Create the schema
const favoritedPlayerSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming there's a User model
      required: true,
    },
    favoritedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming there's a User model
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the current date/time
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set the current date/time
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

// Create the model based on the schema
const FavoritedPlayer = mongoose.model<IFavoritedPlayer>(
  "FavoritedPlayer",
  favoritedPlayerSchema
);

export default FavoritedPlayer;
