const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");

router.get(
  "/getVehicles",

  async (req, res) => {
    

    const { Location, Pickup, Dropoff } = req.query;

    try {
      // Step 1: Get all vehicles at the given location
      let allVehicles = await Vehicle.find({ Location });

      // Step 2: Get all bookings that overlap with the selected date range
      const conflictingBookings = await Booking.find({
        $or: [
          {
            Pickup: { $lt: new Date(Dropoff) },
            Dropoff: { $gt: new Date(Pickup) },
          },
        ],
      });

      const bookedVehicleIds = conflictingBookings.map((booking) =>
        booking.VehicleId.toString()
      );

      // Step 3: Filter out booked vehicles
      const availableVehicles = allVehicles.filter(
        (vehicle) => !bookedVehicleIds.includes(vehicle._id.toString())
      );

      res.json({ success: true, vehicles: availableVehicles });
    } catch (error) {
      console.error("Error fetching available vehicles:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

module.exports = router;
