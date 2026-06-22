const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/gamingBookingController");
const { protect } = require("../middleware/auth");

router.post("/", createBooking);
router.get("/", protect, getBookings);
router.put("/:id", protect, updateBookingStatus);
router.delete("/:id", protect, deleteBooking);

module.exports = router;
