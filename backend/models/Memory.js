const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true
  },
  title: {
    type: String,
    required: [true, "Memory title is required"],
    trim: true
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  dateTime: {
    type: Date,
    required: [true, "Date and time is required"]
  },
  imagePath: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model("Memory", memorySchema);
