const { protect } = require("../middleware/authMiddleware");


const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const memoryController = require("../controllers/memoryController");

router.post("/:tripId", protect, upload.single("image"), memoryController.addMemory);
router.get("/", protect, memoryController.getMemories);
router.delete("/delete/:memoryId", protect, memoryController.deleteMemory);
router.get("/:tripId/stats", protect, memoryController.getTripStats);
router.get("/:tripId/map", protect, memoryController.getMapData);



module.exports = router;
