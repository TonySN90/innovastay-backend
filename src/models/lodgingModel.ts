import mongoose from "mongoose";

const lodgingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Lodging must have a name"],
  },
  maxNumGuests: {
    type: Number,
    required: [true, "Lodging must have a maximum number of guests"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Lodging must have a price per night"],
  },
  description: {
    type: String,
    required: [true, "Lodging must have a description"],
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
    ref: "Amenity",
  }],
  services: {
    type: [String],
    required: [true, "Lodging must have services"],
  },
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Landlord",
    required: [true, "Lodging must have a landlord"],
  },
});

export default mongoose.model("Lodgings", lodgingSchema);
