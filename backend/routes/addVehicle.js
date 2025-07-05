const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const { body, validationResult } = require("express-validator");

router.post(
  "/addVehicle",
  [
    // Required user fields
    body("Type")
      .isIn(["Geared", "Non Geared"])
      .withMessage("Type must be either 'Geared' or 'Non Geared'"),

    body("Brand").isString().notEmpty().withMessage("Brand is required"),

    body("Model").isString().notEmpty().withMessage("Model is required"),

    body("Year")
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage("Year must be valid"),

    body("Price_Per_Hour")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number"),

    body("Location").isString().notEmpty().withMessage("Location is required"),

    body("OwnerId")
      .isAlphanumeric()
      .withMessage("OwnerId must be alphanumeric"),

    body("Availability")
      .isBoolean()
      .withMessage("Availability must be true or false"),

    body("Photos")
      .isArray({ max: 4 })
      .withMessage("Photos must be an array of up to 4 image URLs"),

    body("FuelType").isString().notEmpty().withMessage("FuelType is required"),

    body("FuelCapacity")
      .isFloat({ min: 0 })
      .withMessage("FuelCapacity must be non-negative"),

    body("Weight")
      .isFloat({ min: 0 })
      .withMessage("Weight must be non-negative"),

    body("Mileage")
      .isFloat({ min: 0 })
      .withMessage("Mileage must be non-negative"),

    body("Displacement")
      .isFloat({ min: 0 })
      .withMessage("Displacement must be non-negative"),

    body("TopSpeed")
      .isFloat({ min: 0 })
      .withMessage("TopSpeed must be non-negative"),

    body("Seats").isInt({ min: 1 }).withMessage("Seats must be at least 1"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await Vehicle.create(req.body);
      res.json({ success: true });
    } catch (error) {
      console.error("Error creating vehicle:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
