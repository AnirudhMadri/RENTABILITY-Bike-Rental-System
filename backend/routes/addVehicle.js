const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const { body, validationResult } = require("express-validator");

router.post(
  "/addVehicle",
  [
    body("Type")
      .isIn(["Geared", "Non Geared"])
      .withMessage("Type must be either 'Bike' or 'Car'"),

    body("Brand")
      .isString()
      .withMessage("Brand must be a string")
      .notEmpty()
      .withMessage("Brand is required"),

    body("Model")
      .isString()
      .withMessage("Model must be a string")
      .notEmpty()
      .withMessage("Model is required"),

    body("Year")
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage("Year must be a valid number between 1900 and current year"),

    body("Price_Per_Hour")
      .isFloat({ gt: 0 })
      .withMessage("Price per hour must be a positive number"),

    body("Location")
      .isString()
      .withMessage("Location must be a string")
      .notEmpty()
      .withMessage("Location is required"),

    body("OwnerId")
      .isAlphanumeric()
      .withMessage("OwnerId must be alphanumeric"),

    body("Availability")
      .isBoolean()
      .withMessage("Availability must be true or false"),
    body("Photos")
      .isArray({ max: 4 })
      .withMessage("Photos must be an array of up to 4 image URLs"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await Vehicle.create({
        Type: req.body.Type,
        Brand: req.body.Brand,
        Model: req.body.Model,
        Year: req.body.Year,
        Price_Per_Hour: req.body.Price_Per_Hour,
        Location: req.body.Location,
        OwnerId: req.body.OwnerId,
        Availability: req.body.Availability,
        Photos: req.body.Photos,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
