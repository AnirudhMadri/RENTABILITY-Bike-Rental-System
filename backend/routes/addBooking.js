const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Booking = require("../models/Booking");

router.post(
  "/addBooking",
  [
    body("StartDateTime")
      .isISO8601()
      .withMessage("StartDateTime must be a valid ISO date"),

    body("EndDateTime")
      .isISO8601()
      .withMessage("EndDateTime must be a valid ISO date"),

    body("UserId")
      .isInt({ gt: 0 })
      .withMessage("UserId must be a positive integer"),

    body("VehicleId")
      .isInt({ gt: 0 })
      .withMessage("VehicleId must be a positive integer"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { StartDateTime, EndDateTime, UserId, VehicleId } = req.body;

      await Booking.create({
        StartDateTime,
        EndDateTime,
        UserId,
        VehicleId,
        Status: "pending", // Always set to "pending" by default
      });

      res
        .status(201)
        .json({ success: true, message: "Booking created successfully" });
    } catch (error) {
      console.error("Error creating booking:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

module.exports = router;
