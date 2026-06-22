const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Offer = require("../models/Offer");
const GamingBooking = require("../models/GamingBooking");
const ContactMessage = require("../models/ContactMessage");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// POST /api/admin/login
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/profile
const getProfile = async (req, res, next) => {
  try {
    res.json(req.admin);
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/dashboard-summary
const getDashboardSummary = async (req, res, next) => {
  try {
    const [
      totalProducts,
      totalCategories,
      activeOffers,
      newGamingBookings,
      contactMessages,
      featuredProducts,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Offer.countDocuments({ isActive: true }),
      GamingBooking.countDocuments({ status: "pending" }),
      ContactMessage.countDocuments(),
      Product.countDocuments({ isFeatured: true }),
    ]);

    res.json({
      totalProducts,
      totalCategories,
      activeOffers,
      newGamingBookings,
      contactMessages,
      featuredProducts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginAdmin, getProfile, getDashboardSummary };
