import mongoose from "mongoose";

const lodgingServiceSchema = new mongoose.Schema(
  {
    name: {
      de: {
        type: String,
        required: [true, "Service must have a German name"],
        trim: true,
      },
      en: {
        type: String,
        required: [true, "Service must have an English name"],
        trim: true,
      },
    },
    description: {
      de: {
        type: String,
        required: [true, "Service must have a German description"],
      },
      en: {
        type: String,
        required: [true, "Service must have an English description"],
      },
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
