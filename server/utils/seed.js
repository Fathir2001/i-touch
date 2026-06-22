require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Offer = require("../models/Offer");

const PLACEHOLDER = "https://placehold.co/600x600?text=i-Touch";

const categories = [
  { name: "Cricket Items", type: "sports" },
  { name: "Football Items", type: "sports" },
  { name: "Badminton Items", type: "sports" },
  { name: "Gym Equipment", type: "sports" },
  { name: "Jerseys", type: "sportswear" },
  { name: "Track Pants", type: "sportswear" },
  { name: "Shooting Games", type: "gaming" },
  { name: "Racing Games", type: "gaming" },
  { name: "Mobile Phones", type: "mobile" },
  { name: "Phone Accessories", type: "mobile" },
];

const sampleProducts = [
  {
    name: "Pro Cricket Bat",
    category: "sports",
    subCategory: "Cricket Items",
    price: 8500,
    shortDescription: "English willow cricket bat for serious players.",
    description: "Premium grade English willow cricket bat with full-size handle, great balance and power.",
    images: [PLACEHOLDER],
    isFeatured: true,
  },
  {
    name: "i-Touch Home Jersey",
    category: "sportswear",
    subCategory: "Jerseys",
    price: 2500,
    shortDescription: "Breathable match-day jersey.",
    description: "Lightweight, breathable polyester jersey designed for performance and comfort.",
    images: [PLACEHOLDER],
    isFeatured: true,
  },
  {
    name: "PS5 Racing Wheel Session",
    category: "gaming",
    subCategory: "Racing Games",
    price: 500,
    shortDescription: "1 hour PS5 racing session with steering wheel.",
    description: "Enjoy an immersive racing experience with our steering wheel + pedal setup on PS5.",
    images: [PLACEHOLDER],
    isFeatured: true,
  },
  {
    name: "Smartphone X200",
    category: "mobile",
    subCategory: "Mobile Phones",
    price: 65000,
    shortDescription: "128GB | 8GB RAM | 5G ready.",
    description: "Latest generation smartphone with high-resolution camera, all-day battery, and 5G connectivity.",
    images: [PLACEHOLDER],
    isFeatured: true,
  },
];

const run = async () => {
  await connectDB();

  const adminExists = await Admin.findOne({ email: process.env.SEED_ADMIN_EMAIL });
  if (!adminExists) {
    await Admin.create({
      name: process.env.SEED_ADMIN_NAME || "Admin",
      email: process.env.SEED_ADMIN_EMAIL || "admin@itouch.com",
      password: process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!",
    });
    console.log("Admin account created.");
  } else {
    console.log("Admin already exists, skipping.");
  }

  for (const cat of categories) {
    const exists = await Category.findOne({ name: cat.name });
    if (!exists) await Category.create(cat);
  }
  console.log("Categories seeded.");

  for (const prod of sampleProducts) {
    const exists = await Product.findOne({ name: prod.name });
    if (!exists) await Product.create(prod);
  }
  console.log("Sample products seeded.");

  const offerExists = await Offer.findOne({ title: "Welcome Offer" });
  if (!offerExists) {
    await Offer.create({
      title: "Welcome Offer",
      description: "Get a special discount on your first purchase at i-Touch.",
      discountText: "10% OFF",
      image: PLACEHOLDER,
      isActive: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    console.log("Sample offer seeded.");
  }

  console.log("Seeding complete.");
  mongoose.connection.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
