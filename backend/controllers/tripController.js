const Trip = require("../models/Trip");

// CREATE TRIP
exports.createTrip = async (req, res) => {
    try {
        const { tripName, startDate, endDate } = req.body;

        if (!tripName || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        // Get uploaded file path if image exists
        const coverImage = req.file ? req.file.path : "";

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
        console.error("Create trip error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// GET ALL TRIPS FOR USER
exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: trips.length,
            trips
        });

    } catch (error) {
        console.error("Get trips error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// GET SINGLE TRIP
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
        console.error("Get trip error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// DELETE TRIP
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

        await Trip.deleteOne({ _id: trip._id });

        res.json({
            success: true,
            message: "Trip deleted successfully"
        });

    } catch (error) {
        console.error("Delete trip error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
