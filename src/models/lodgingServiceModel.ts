import mongoose from "mongoose";

const lodgingServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service must have a name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Service must have a description"],
    },
    icon: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("LodgingServices", lodgingServiceSchema);