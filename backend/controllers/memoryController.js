const Memory = require("../models/Memory");
const fs = require("fs");
const Trip = require("../models/Trip");

// =======================
// ADD MEMORY
// =======================
exports.addMemory = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { title, location, notes, dateTime, latitude, longitude } = req.body;

    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Ownership validation
    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const memory = new Memory({
      tripId,
      title,
      location,
      notes,
      dateTime,
      imagePath: req.file ? req.file.path.replace(/\\/g, "/") : null,
      latitude,
      longitude
    });

    await memory.save();

    res.status(201).json(memory);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET MEMORIES (Timeline)
// =======================
exports.getMemories = async (req, res) => {
  try {
    const { tripId } = req.params;

    const memories = await Memory.find({ tripId })
      .sort({ dateTime: 1 });

    res.status(200).json(memories);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// DELETE MEMORY
// =======================
exports.deleteMemory = async (req, res) => {
  try {
    const { memoryId } = req.params;

    const memory = await Memory.findById(memoryId);

    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    // Delete image if exists
    if (memory.imagePath) {
      fs.unlink(memory.imagePath, (err) => {
        if (err) {
          console.log("Image deletion error:", err);
        }
      });
    }

    await memory.deleteOne();

    res.status(200).json({ message: "Memory deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// TRIP STATISTICS
// =======================
exports.getTripStats = async (req, res) => {
  try {
    const { tripId } = req.params;

    const memories = await Memory.find({ tripId });

    const totalMemories = memories.length;

    const uniqueLocations = [
      ...new Set(memories.map(m => m.location))
    ].length;

    const dates = memories.map(m => new Date(m.dateTime));

    const tripDays =
      dates.length > 0
        ? Math.ceil(
            (Math.max(...dates) - Math.min(...dates)) /
              (1000 * 60 * 60 * 24)
          ) + 1
        : 0;

    res.status(200).json({
      totalMemories,
      uniqueLocations,
      tripDays
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// MAP DATA (Coordinates)
// =======================
exports.getMapData = async (req, res) => {
  try {
    const { tripId } = req.params;

    const memories = await Memory.find({ tripId });

    const coordinates = memories
      .filter(m => m.latitude && m.longitude)
      .map(m => ({
        lat: m.latitude,
        lng: m.longitude
      }));

    res.status(200).json(coordinates);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
