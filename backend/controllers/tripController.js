// const Memory = require("../models/Memory"); // Will be enabled in Phase 5
const Trip = require("../models/Trip");

exports.createTrip = async (req, res) => {
    try {
    const { tripName, startDate, endDate, coverImage } = req.body;

    if (!tripName || !startDate || !endDate) {
        return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
        });
    }

    const trip = await Trip.create({
        user: req.user._id,
        tripName,
        startDate,
        endDate,
        coverImage
    });

    res.status(201).json({
        success: true,
        trip
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Server error"
    });
    }
};

exports.getTrips = async (req, res) => {
    try {
    const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json({
        success: true,
        count: trips.length,
        trips
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Server error"
    });
    }
};

exports.getTripById = async (req, res) => {
    try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
        return res.status(404).json({
        success: false,
        message: "Trip not found"
        });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
        success: false,
        message: "Not authorized"
        });
    }

    res.json({
        success: true,
        trip
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Server error"
    });
    }
};

/*
    IMPORTANT:
    When Memory model is implemented,
    this controller must:
    1. Delete all memories with this trip ID
    2. Then delete the trip
*/
exports.deleteTrip = async (req, res) => {
    try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
        return res.status(404).json({
        success: false,
        message: "Trip not found"
        });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
        success: false,
        message: "Not authorized"
        });
    }

    // CASCADE DELETE PLACEHOLDER (DO NOT REMOVE)
    // Later we will import Memory model and delete related memories here

    await Trip.deleteOne({ _id: trip._id });

    res.json({
        success: true,
        message: "Trip deleted successfully"
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Server error"
    });
    }
};