import mongoose from "mongoose";

const lodgingRoomSchema = new mongoose.Schema(
  {
    name: {
      de: {
        type: String,
        required: [true, "Room must have a German name"],
        trim: true,
      },
      en: {
        type: String,
        required: [true, "Room must have an English name"],
        trim: true,
      },
    },
    description: {
      de: {
        type: String,
        required: [true, "Room must have a German description"],
      },
      en: {
        type: String,
        required: [true, "Room must have an English description"],
      },
    },
    quantity: {
      type: Number,
      required: [true, "Room must have a quantity"],
      min: [1, "Quantity must be at least 1"],
    },
    lodging: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lodgings",
      required: [true, "Room must be associated with a lodging"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("LodgingRooms", lodgingRoomSchema);