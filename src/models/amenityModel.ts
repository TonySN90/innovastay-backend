import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Amenity must have a name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Amenity must have a description"],
    },
    icon: {
      type: String,
      required: false,
    },
    // category: {
    //   type: String,
    //   required: [true, "Amenity must have a category"],
    //   enum: ["comfort", "technology", "safety", "recreation", "accessibility", "other"],
    // },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Amenities", amenitySchema);
