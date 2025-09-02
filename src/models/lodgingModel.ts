import mongoose from "mongoose";

const lodgingSchema = new mongoose.Schema({
  name: {
    de: {
      type: String,
      required: [true, "Lodging must have a German name"],
      trim: true,
    },
    en: {
      type: String,
      required: [true, "Lodging must have an English name"],
      trim: true,
    },
  },
  description: {
    de: {
      type: String,
      required: [true, "Lodging must have a German description"],
    },
    en: {
      type: String,
      required: [true, "Lodging must have an English description"],
    },
  },
  maxNumGuests: {
    type: Number,
    required: [true, "Lodging must have a maximum number of guests"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Lodging must have a price per night"],
  },
  location: {
    type: String,
    required: [true, "Lodging must have a location"],
  },
  images: {
    type: [String],
    required: [true, "Lodging must have images"],
  },
  amenities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenities",
    },
  ],
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LodgingServices",
    },
  ],
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Landlord",
    required: [true, "Lodging must have a landlord"],
  },
});

export default mongoose.model("Lodgings", lodgingSchema);
