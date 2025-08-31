import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title_de: {
      type: String,
      required: [true, "Article must have a German title"],
      trim: true,
    },
    title_en: {
      type: String,
      required: [true, "Article must have an English title"],
      trim: true,
    },
    title_fr: {
      type: String,
      required: [true, "Article must have a French title"],
      trim: true,
    },
    title_ru: {
      type: String,
      required: [true, "Article must have a Russian title"],
      trim: true,
    },
    title_cs: {
      type: String,
      required: [true, "Article must have a Czech title"],
      trim: true,
    },
    title_it: {
      type: String,
      required: [true, "Article must have an Italian title"],
      trim: true,
    },
    title_es: {
      type: String,
      required: [true, "Article must have a Spanish title"],
      trim: true,
    },
    subtitle_de: {
      type: String,
      required: [true, "Article must have a German subtitle"],
      trim: true,
    },
    subtitle_en: {
      type: String,
      required: [true, "Article must have an English subtitle"],
      trim: true,
    },
    subtitle_fr: {
      type: String,
      required: [true, "Article must have a French subtitle"],
      trim: true,
    },
    subtitle_ru: {
      type: String,
      required: [true, "Article must have a Russian subtitle"],
      trim: true,
    },
    subtitle_cs: {
      type: String,
      required: [true, "Article must have a Czech subtitle"],
      trim: true,
    },
    subtitle_it: {
      type: String,
      required: [true, "Article must have an Italian subtitle"],
      trim: true,
    },
    subtitle_es: {
      type: String,
      required: [true, "Article must have a Spanish subtitle"],
      trim: true,
    },
    description_de: {
      type: String,
      required: [true, "Article must have a German description"],
    },
    description_en: {
      type: String,
      required: [true, "Article must have an English description"],
    },
    description_fr: {
      type: String,
      required: [true, "Article must have a French description"],
    },
    description_ru: {
      type: String,
      required: [true, "Article must have a Russian description"],
    },
    description_cs: {
      type: String,
      required: [true, "Article must have a Czech description"],
    },
    description_it: {
      type: String,
      required: [true, "Article must have an Italian description"],
    },
    description_es: {
      type: String,
      required: [true, "Article must have a Spanish description"],
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

// Middleware to set position based on existing articles for the lodging
articleSchema.pre('save', async function (next) {
  if (this.isNew) {
    const articleCount = await mongoose.model('Articles').countDocuments({ lodging: this.lodging });
    this.position = articleCount + 1;
  }
  next();
});

export default mongoose.model("Articles", articleSchema);