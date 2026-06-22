const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    category: { type: String, required: true }, // sports | sportswear | gaming | mobile
    subCategory: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    images: [{ type: String }],
    stockStatus: {
      type: String,
      enum: ["in-stock", "out-of-stock", "limited"],
      default: "in-stock",
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.isModified("name") || !this.slug) {
    this.slug = `${slugify(this.name, { lower: true, strict: true })}-${Math.random()
      .toString(36)
      .substring(2, 7)}`;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
