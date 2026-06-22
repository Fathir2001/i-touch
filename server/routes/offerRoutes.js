const express = require("express");
const router = express.Router();
const {
  getActiveOffers,
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} = require("../controllers/offerController");
const { protect } = require("../middleware/auth");

router.get("/", getActiveOffers);
router.get("/admin", protect, getAllOffers);
router.post("/", protect, createOffer);
router.put("/:id", protect, updateOffer);
router.delete("/:id", protect, deleteOffer);

module.exports = router;
