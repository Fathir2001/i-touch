const express = require("express");
const router = express.Router();
const { loginAdmin, getProfile, getDashboardSummary } = require("../controllers/adminController");
const { protect } = require("../middleware/auth");

router.post("/login", loginAdmin);
router.get("/profile", protect, getProfile);
router.get("/dashboard-summary", protect, getDashboardSummary);

module.exports = router;
