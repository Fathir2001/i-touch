const express = require("express");
const router = express.Router();
const {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
} = require("../controllers/contactController");
const { protect } = require("../middleware/auth");

router.post("/", createContactMessage);
router.get("/", protect, getContactMessages);
router.delete("/:id", protect, deleteContactMessage);

module.exports = router;
