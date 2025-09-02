import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      de: {
        type: String,
        required: [true, "Article must have a German title"],
        trim: true,
      },
      en: {
        type: String,
        required: [true, "Article must have an English title"],
        trim: true,
      },
    },
    description: {
      de: {
        type: String,
        required: [true, "Article must have a German description"],
      },
      en: {
        type: String,
        required: [true, "Article must have an English description"],
      },
    },
    imageLink: {
      type: String,
      required: [true, "Article must have an image link"],
    },
    position: {
      type: Number,
      required: true,
      default: 1,
    },
    lodging: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lodgings",
      required: [true, "Article must be associated with a lodging"],
    },
  },
  {
    timestamps: true,
  },
);

articleSchema.pre("save", async function (next) {
  if (this.isNew) {
    const articleCount = await mongoose
      .model("Articles")
      .countDocuments({ lodging: this.lodging });
    this.position = articleCount + 1;
  }
  next();
});

export default mongoose.model("Articles", articleSchema);
