// POST /api/upload - single or multiple image upload (admin only)
const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const urls = req.files.map((file) => file.path);
    res.json({ urls });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadImages };
