import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema(
  {
    name_de: {
      type: String,
      required: [true, "Amenity must have a German name"],
      unique: true,
      trim: true,
    },
    name_en: {
      type: String,
      required: [true, "Amenity must have an English name"],
      trim: true,
    },
    name_fr: {
      type: String,
      required: [true, "Amenity must have a French name"],
      trim: true,
    },
    name_ru: {
      type: String,
      required: [true, "Amenity must have a Russian name"],
      trim: true,
    },
    name_cs: {
      type: String,
      required: [true, "Amenity must have a Czech name"],
      trim: true,
    },
    name_it: {
      type: String,
      required: [true, "Amenity must have an Italian name"],
      trim: true,
    },
    name_es: {
      type: String,
      required: [true, "Amenity must have a Spanish name"],
      trim: true,
    },
    description_de: {
      type: String,
      required: [true, "Amenity must have a German description"],
    },
    description_en: {
      type: String,
      required: [true, "Amenity must have an English description"],
    },
    description_fr: {
      type: String,
      required: [true, "Amenity must have a French description"],
    },
    description_ru: {
      type: String,
      required: [true, "Amenity must have a Russian description"],
    },
    description_cs: {
      type: String,
      required: [true, "Amenity must have a Czech description"],
    },
    description_it: {
      type: String,
      required: [true, "Amenity must have an Italian description"],
    },
    description_es: {
      type: String,
      required: [true, "Amenity must have a Spanish description"],
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

export default mongoose.model("Amenities", amenitySchema);
