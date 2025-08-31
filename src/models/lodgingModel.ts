import mongoose from "mongoose";

const lodgingSchema = new mongoose.Schema({
  name_de: {
    type: String,
    required: [true, "Lodging must have a German name"],
    trim: true,
  },
  name_en: {
    type: String,
    required: [true, "Lodging must have an English name"],
    trim: true,
  },
  name_fr: {
    type: String,
    required: [true, "Lodging must have a French name"],
    trim: true,
  },
  name_ru: {
    type: String,
    required: [true, "Lodging must have a Russian name"],
    trim: true,
  },
  name_cs: {
    type: String,
    required: [true, "Lodging must have a Czech name"],
    trim: true,
  },
  name_it: {
    type: String,
    required: [true, "Lodging must have an Italian name"],
    trim: true,
  },
  name_es: {
    type: String,
    required: [true, "Lodging must have a Spanish name"],
    trim: true,
  },
  maxNumGuests: {
    type: Number,
    required: [true, "Lodging must have a maximum number of guests"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Lodging must have a price per night"],
  },
  description_de: {
    type: String,
    required: [true, "Lodging must have a German description"],
  },
  description_en: {
    type: String,
    required: [true, "Lodging must have an English description"],
  },
  description_fr: {
    type: String,
    required: [true, "Lodging must have a French description"],
  },
  description_ru: {
    type: String,
    required: [true, "Lodging must have a Russian description"],
  },
  description_cs: {
    type: String,
    required: [true, "Lodging must have a Czech description"],
  },
  description_it: {
    type: String,
    required: [true, "Lodging must have an Italian description"],
  },
  description_es: {
    type: String,
    required: [true, "Lodging must have a Spanish description"],
  },
  location: {
    type: String,
    required: [true, "Lodging must have a location"],
  },
  images: {
    type: [String],
    required: [true, "Lodging must have images"],
  },
  amenities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Amenities",
  }],
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "LodgingServices",
  }],
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Landlord",
    required: [true, "Lodging must have a landlord"],
  },
});

export default mongoose.model("Lodgings", lodgingSchema);
